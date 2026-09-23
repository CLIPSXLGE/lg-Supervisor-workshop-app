// Vercel 서버리스 함수: AI 리더십 코치 프록시 (API 키는 서버 환경변수에만 존재)
// PRD 원칙: 유형 판정은 규칙 기반(클라이언트), AI는 코칭 보완만. Deep 대상 1명의 정보만 전송.
const SYSTEM = `당신은 LG전자 서비스센터 반장을 돕는 AI 리더십 코치입니다.
원칙: 반장의 관찰·판단이 먼저이며 AI는 이를 보완만 한다. 구성원의 유형을 판정하거나 바꾸지 않는다.
출력은 JSON 객체 하나만, 다른 텍스트나 코드블록 없이. 키: good_start, check_more, other_view, approaches(정확히 2개, 각 {title, how, why}), avoid.
각 항목은 120~180자 이내로 짧고 간결하게 작성한다(길게 쓰지 말 것). 존댓말, 관찰 행동 중심.
반드시 완결된 JSON으로 끝맺는다 — 마지막 항목까지 다 쓰지 못할 것 같으면 문장을 줄여서라도 JSON을 완성한다.
금지 표현: "원래 이런 사람", "의지가 부족", "책임감이 없", "소극적인 성격", "번아웃", "불안이 높은", "리더십에 문제".
권장 표현: "최근 입력된 행동에서는", "현재 관찰한 모습만 보면", "이런 가능성도 확인해볼 수 있습니다".`;

const ALLOWED = ["anonId", "observed", "competence", "motivation", "leaderThoughts", "myChange", "purpose"];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const input = Object.fromEntries(ALLOWED.filter(k => k in body).map(k => [k, body[k]]));
  // PRD 5-2: 점수와 반장의 가설이 입력되기 전에는 AI 생성 금지
  if (!input.competence || !input.motivation || !input.leaderThoughts?.length)
    return res.status(400).json({ error: "역량·동기 점수와 반장의 리더십 가설이 먼저 필요합니다." });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: "ANTHROPIC_API_KEY 미설정" });

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: process.env.COACH_MODEL || "claude-sonnet-5",
      max_tokens: 1600,
      system: SYSTEM,
      messages: [{ role: "user", content: JSON.stringify(input) }],
    }),
  });
  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    return res.status(502).json({ error: "AI 호출 실패", status: r.status, detail: detail.slice(0, 500) });
  }
  const j = await r.json();
  const text = (j.content || []).map(c => c.text || "").join("");
  const cleaned = text.replace(/^```json\s*|```\s*$/g, "").trim();
  try { return res.status(200).json(JSON.parse(cleaned)); }
  catch (e) {
    // 응답이 잘렸거나 앞뒤에 텍스트가 섞였을 때, 가장 바깥 { ... }만 추출해서 한 번 더 시도
    const start = cleaned.indexOf("{"), end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try { return res.status(200).json(JSON.parse(cleaned.slice(start, end + 1))); } catch (e2) {}
    }
    return res.status(200).json({ raw: text, truncated: j.stop_reason === "max_tokens" });
  }
}
