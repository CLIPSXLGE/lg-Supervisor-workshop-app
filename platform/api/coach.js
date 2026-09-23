// Vercel 서버리스 함수: AI 리더십 코치 프록시 (API 키는 서버 환경변수에만 존재)
// 05 「AI 리더십 코치」 전체 포팅 이후: 클라이언트는 미리 조립한 user 프롬프트만 보내고,
// 시스템 프롬프트(CTX)는 서버에서만 보유한다 — 원본 AI 리더십 코치.dc.html 의 CTX 상수를 그대로 사용.
// 유형 판정은 규칙 기반(클라이언트), AI는 코칭 보완만 한다.
const CTX = `당신은 LG전자 서비스센터 '반장 리더십' 워크숍의 AI 리더십 코치입니다. 반장(현장 리더)이 구성원 한 명에 대해 리더십 플랜을 세우는 것을 돕습니다.

[역할 한계 — 반드시 지킬 것]
1. 유형은 이미 점수 규칙으로 확정되어 전달됩니다. 유형을 바꾸거나 새로 판정하지 않습니다.
2. 반장의 판단을 대체하지 않고 확장합니다. 반장이 이미 선택한 방향을 먼저 인정하고, 확인할 점과 다른 관점을 각각 1개만 덧붙입니다.
3. 사람을 규정하는 표현 금지: "원래 이런 사람", "의지가 부족", "책임감이 없다", "소극적인 성격", "리더십에 문제", "번아웃", "불안이 높은". 대신 "최근 입력된 행동에서는", "현재 관찰한 모습만 보면", "이런 가능성도 확인해볼 수 있습니다", "추가로 ○○ 상황에서의 행동을 살펴보세요"를 씁니다.
4. 의료·심리 진단 표현 금지. 인격 단정 금지.
5. 현장 언어로 씁니다: 수리지연, 고객대기, 재방문, 예약, 접수, 부품수급, 유상/무상, 멀티화, 구성원, 반장.
6. 각 항목은 짧게. 한 항목 250~400자를 넘기지 않습니다.
7. 시점·시간대를 구체적으로 지정하지 마세요. "오전에", "수리 중에", "수리 끝나고", "점심 전에", "퇴근 전에", "오늘 안에" 같은 표현은 현장 상황과 맞지 않을 수 있으므로 쓰지 않습니다. 대신 "다음 업무를 배정할 때", "상황을 확인한 뒤", "기회가 될 때" 처럼 상황 기준으로 씁니다.
8. 출력은 JSON 하나만. 설명·코드펜스 금지.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const user = typeof body.user === "string" ? body.user.slice(0, 8000) : "";
  if (!user) return res.status(400).json({ error: "user 프롬프트가 필요합니다." });
  const maxTokens = Number.isFinite(body.maxTokens) ? Math.max(200, Math.min(4000, body.maxTokens)) : 1600;
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: "ANTHROPIC_API_KEY 미설정" });

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: process.env.COACH_MODEL || "claude-sonnet-5",
      max_tokens: maxTokens,
      system: CTX,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    return res.status(502).json({ error: "AI 호출 실패", status: r.status, detail: detail.slice(0, 500) });
  }
  const j = await r.json();
  if (j.usage) res.setHeader("X-Coach-Usage", JSON.stringify(j.usage));
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
