/* 반장 리더십 RACE 워크숍 · 강사용 실시간 대시보드
 * 교육생 모바일 앱에서 들어오는 값을 Supabase 실시간으로 받아 표시 */
(function () {
  "use strict";
  const AREA_NAMES = ["방향 연결", "일상 운영", "관계와 문화", "성과와 성장"];
  const TEAM_COLORS = ["#00D2BE", "#FF8000", "#3671C6", "#FFD400", "#FF3AA0", "#6C4BF6"];
  const TABS = [
    { key: "roster", label: "참가자 현황" },
    { key: "team", label: "팀 이름·구호" },
    { key: "diag", label: "자가진단 결과" },
    { key: "bp", label: "아침 조회" },
    { key: "coach", label: "AI 코치 플랜" },
  ];
  let tab = "roster";
  const nav = document.getElementById("nav");
  const main = document.getElementById("main");
  const codeInput = document.getElementById("code-input");

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  try { codeInput.value = JSON.parse(localStorage.getItem("lgws-instructor-code") || "null") || ""; } catch (e) {}

  (async function boot() {
    const cfg = window.LGWS_CONFIG || {};
    await window.LGWS.init({ url: cfg.url, anonKey: cfg.anonKey, code: codeInput.value.trim() });
    window.LGWS.subscribe(render);
    renderNav(); render();
  })();

  document.getElementById("code-apply").onclick = async () => {
    const code = codeInput.value.replace(/\D/g, "").slice(0, 4);
    codeInput.value = code;
    localStorage.setItem("lgws-instructor-code", JSON.stringify(code));
    const cfg = window.LGWS_CONFIG || {};
    await window.LGWS.init({ url: cfg.url, anonKey: cfg.anonKey, code });
    render();
  };

  function renderNav() {
    nav.innerHTML = TABS.map(t => `<button data-tab="${t.key}" class="${tab===t.key?'on':''}">${t.label}</button>`).join("");
    nav.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => { tab = b.dataset.tab; renderNav(); render(); });
  }

  function render() {
    const s = window.LGWS.state();
    if (tab === "roster") return renderRoster(s);
    if (tab === "team") return renderTeam(s);
    if (tab === "diag") return renderDiag(s);
    if (tab === "bp") return renderBp(s);
    if (tab === "coach") return renderCoach(s);
  }

  function renderRoster(s) {
    const roster = s.roster || [];
    if (!roster.length) { main.innerHTML = emptyState("아직 입장한 참가자가 없습니다."); return; }
    const byTeam = {};
    roster.forEach(r => { (byTeam[r.teamNo] = byTeam[r.teamNo] || []).push(r); });
    main.innerHTML = `
      <div class="card" style="margin-bottom:16px"><div class="lbl">전체 참가자</div><div class="stat">${roster.length}</div></div>
      <div class="grid">
        ${Object.keys(byTeam).sort((a,b)=>a-b).map(t => `
          <div class="card">
            <div class="teamname" style="color:${TEAM_COLORS[t-1]||'#fff'}">${t}조</div>
            <div class="muted" style="margin:6px 0 10px">${byTeam[t].length}명</div>
            ${byTeam[t].map(r => `<div style="padding:4px 0">${esc(r.name)}</div>`).join("")}
          </div>`).join("")}
      </div>`;
  }

  function renderTeam(s) {
    const teams = s.teams || {};
    const nos = Object.keys(teams);
    if (!nos.length) { main.innerHTML = emptyState("아직 전송된 팀 이름이 없습니다."); return; }
    main.innerHTML = `<div class="grid">${nos.sort((a,b)=>a-b).map(no => { const t = teams[no]; return `
      <div class="card" style="border-left:4px solid ${TEAM_COLORS[no-1]||'#fff'}">
        <div class="lbl">${no}조</div>
        <div class="teamname" style="margin:6px 0">${esc(t.name||"-")}</div>
        <div class="muted">“${esc(t.slogan||"")}”</div>
        <div style="margin-top:10px;font-size:13px;color:#B4BBC7">대표 · ${esc(t.rep||"-")}</div>
      </div>`; }).join("")}</div>`;
  }

  function renderDiag(s) {
    const diag = s.diag || {};
    const names = Object.keys(diag);
    if (!names.length) { main.innerHTML = emptyState("아직 제출된 자가진단이 없습니다."); return; }
    const totals = names.map(n => diag[n].total || 0);
    const avg = Math.round(totals.reduce((a,b)=>a+b,0) / totals.length);
    main.innerHTML = `
      <div class="grid" style="margin-bottom:20px">
        <div class="card"><div class="lbl">완료 인원</div><div class="stat">${names.filter(n=>diag[n].count>=20).length}<span style="font-size:18px;color:#B4BBC7">/${names.length}</span></div></div>
        <div class="card"><div class="lbl">전체 평균</div><div class="stat">${avg}<span style="font-size:18px;color:#B4BBC7">/100</span></div></div>
      </div>
      <table><thead><tr><th>이름</th><th>조</th><th>진행</th><th>총점</th></tr></thead><tbody>
      ${names.map(n => { const d = diag[n]; return `<tr><td>${esc(n)}</td><td>${esc(d.team||"-")}</td><td>${d.count||0}/20</td><td style="font-weight:900">${d.total||0}</td></tr>`; }).join("")}
      </tbody></table>`;
  }

  function renderBp(s) {
    const bp = s.bp || [];
    if (!bp.length) { main.innerHTML = emptyState("아직 전송된 아침 조회 방식이 없습니다."); return; }
    main.innerHTML = `<div class="grid">${bp.map(b => `
      <div class="card">
        <div style="display:flex;justify-content:space-between"><b>${esc(b.name)}</b><span class="muted">${esc(b.team||"")}</span></div>
        <div class="muted" style="margin:8px 0 4px">${esc(b.when||"")}</div>
        <div style="margin:6px 0">${esc(b.how||"")}</div>
        ${b.best ? `<div class="approach">효과 있었던 것: ${esc(b.best)}</div>` : ""}
      </div>`).join("")}</div>`;
  }

  function renderCoach(s) {
    const coach = s.coach || {};
    const names = Object.keys(coach);
    if (!names.length) { main.innerHTML = emptyState("아직 저장된 AI 코치 플랜이 없습니다."); return; }
    main.innerHTML = `<div class="grid">${names.map(n => { const p = coach[n]; return `
      <div class="card">
        <div class="lbl">${esc(p.team||"")} · ${esc(n)}</div>
        <div class="teamname" style="margin:6px 0">${esc(p.targetName||"-")}</div>
        <div class="muted">역량 ${p.competence} · 동기 ${p.motivation} · ${esc(p.quadrant||"")}</div>
        <div style="margin-top:8px;font-size:13px"><b>필요한 리더십</b> ${esc((p.need||[]).join(", "))}</div>
        <div style="margin-top:4px;font-size:13px"><b>바꿔볼 행동</b> ${esc(p.myChange||"")}</div>
        ${(p.approaches||[]).map(a => `<div class="approach">${esc(a.title||"")}</div>`).join("")}
      </div>`; }).join("")}</div>`;
  }

  function emptyState(msg) { return `<div class="empty">${esc(msg)}<br><span style="font-size:13px">상단에 강의 입장코드를 입력하고 적용을 눌렀는지 확인해주세요.</span></div>`; }
})();
