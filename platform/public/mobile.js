/* 반장 리더십 RACE 워크숍 · 교육생용 모바일 웹앱
 * 원본 .dc.html의 화면 구성/문구를 그대로 재구현 + Supabase 실시간 연동 + AI 코치 챕터(신규) */
(function () {
  "use strict";

  const AREAS = [
    { name: "방향 연결", color: "#E10600", items: [
      "센터의 방향과 핵심 목표를 내 말로 설명할 수 있다.",
      "업무를 지시할 때 왜 중요한지 함께 설명한다.",
      "실장에게 현장 상황과 이슈를 사실대로 공유한다.",
      "변경된 기준을 SM이 이해했는지 확인한다.",
      "숫자와 현장 행동의 연결점을 찾아 설명한다."] },
    { name: "일상 운영", color: "#FF8000", items: [
      "아침 조회에서 당일 우선순위를 명확히 안내한다.",
      "SM의 역량과 업무량을 고려해 업무를 배분한다.",
      "지시할 때 완료 기준과 확인 시점을 합의한다.",
      "진행 중인 업무와 지연 가능성을 수시로 파악한다.",
      "문제가 생기면 원인을 확인한 뒤 지원 방법을 정한다."] },
    { name: "관계와 문화", color: "#FFD400", items: [
      "출근한 SM에게 먼저 눈을 맞추고 인사한다.",
      "평소와 다른 표정·말투·행동을 알아차린다.",
      "문제를 빠르게 알린 행동을 인정한다.",
      "잘한 행동을 구체적으로 바로 말해준다.",
      "질문과 의견을 말해도 괜찮은 분위기를 만든다."] },
    { name: "성과와 성장", color: "#00D2BE", items: [
      "성과 차이가 날 때 개인별 원인을 구분해 본다.",
      "피드백은 사실과 기준을 중심으로 짧게 전달한다.",
      "SM이 스스로 해결할 수 있도록 질문하고 기다린다.",
      "필요한 기술을 보여주고 함께한 뒤 맡겨본다.",
      "합의한 행동을 다시 확인하고 변화 여부를 점검한다."] },
  ];
  const ACTS = [
    { key: "team", no: "01", label: "팀 이름·구호", accent: "#00D2BE" },
    { key: "diag", no: "02", label: "자가진단", accent: "#E10600" },
    { key: "result", no: "03", label: "진단 결과", accent: "#00D2BE" },
    { key: "bp", no: "04", label: "우리 반 아침 조회", accent: "#3671C6" },
    { key: "coach", no: "05", label: "AI 리더십 코치", accent: "#FFD400" },
  ];
  const NEED_OPTIONS = [
    "잘하고 있는 행동 인정", "동기가 낮아진 이유 들어보기", "목표·업무 의미 다시 연결",
    "업무 기준 명확하게 설명", "기술·업무 방법 구체적으로 지원", "작은 성공 경험 만들기",
    "자율성과 권한 확대", "더 도전적인 역할 부여", "점검 빈도 높이기",
  ];
  const CHANGE_OPTIONS = [
    "먼저 묻고 듣기", "기대수준을 더 구체적으로 설명하기", "잘한 행동을 바로 인정하기",
    "업무를 더 작은 단계로 나눠주기", "중간 점검을 늘리기", "자율적으로 판단할 범위를 넓혀주기",
  ];
  const PURPOSE_OPTIONS = [
    "잘한 행동 인정·강화", "반복되는 행동 개선", "동기가 낮아진 이유 탐색",
    "성장·기술 숙련 지원", "업무 기준 조율", "새로운 역할·도전 제안",
  ];

  const root = document.getElementById("app");
  const S = {
    me: null, screen: "diag", indexOpen: false,
    inCode: "", inName: "", inTeamNo: 0, inTeamName: "", joinError: "",
    tnDraft: "", tsDraft: "", trDraft: "", tmSaved: false,
    page: 0, answers: {},
    bpWhen: "", bpHow: "", bpBest: "", bpSaved: false,
    coachStep: 0,
    coach: { targetName: "", posObs: "", negObs: "", recent: "", competence: 5, motivation: 5, need: [], change: "", changeCustom: "", purpose: "", loading: false, error: "", result: null, chosen: [], planSaved: false },
  };

  function set(patch) { Object.assign(S, patch); render(); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  // ---------- 부트스트랩 ----------
  try {
    const saved = JSON.parse(localStorage.getItem("lgws-me") || "null");
    if (saved && saved.name) Object.assign(S, { me: saved, inCode: saved.code, inName: saved.name, inTeamNo: saved.teamNo, inTeamName: saved.teamName || "" });
  } catch (e) {}

  (async function boot() {
    const cfg = window.LGWS_CONFIG || {};
    await window.LGWS.init({ url: cfg.url, anonKey: cfg.anonKey, code: S.me ? S.me.code : "" });
    window.LGWS.subscribe(() => render());
    render();
  })();

  // ---------- 액션 ----------
  const A = window.MobileApp = {
    setCode: v => set({ inCode: v.replace(/\D/g, "").slice(0, 4), joinError: "" }),
    setName: v => set({ inName: v, joinError: "" }),
    setTeamName: v => set({ inTeamName: v }),
    pickTeam: n => set({ inTeamNo: n }),
    join: async () => {
      const ready = S.inCode.length === 4 && S.inName.trim().length > 0 && S.inTeamNo > 0;
      if (!ready) return set({ joinError: "센터코드 4자리, 이름, 조 번호를 모두 입력해주세요." });
      const nm = { code: S.inCode, name: S.inName.trim(), teamNo: S.inTeamNo, teamName: S.inTeamName.trim() };
      localStorage.setItem("lgws-me", JSON.stringify(nm));
      await window.LGWS.init({ url: (window.LGWS_CONFIG || {}).url, anonKey: (window.LGWS_CONFIG || {}).anonKey, code: nm.code });
      await window.LGWS.push("roster", nm.name, nm);
      set({ me: nm, screen: "team", joinError: "" });
    },
    logout: () => { localStorage.removeItem("lgws-me"); set({ me: null, screen: "diag", indexOpen: false }); },
    toggleIndex: () => set({ indexOpen: !S.indexOpen }),
    go: k => set({ screen: k, indexOpen: false }),

    setTn: v => set({ tnDraft: v }), setTs: v => set({ tsDraft: v }), setTr: v => set({ trDraft: v }),
    sendTeam: async () => {
      if (!S.tnDraft.trim() || !S.trDraft.trim() || !S.me) return;
      await window.LGWS.push("team", S.me.teamNo, { name: S.tnDraft.trim(), slogan: S.tsDraft.trim(), rep: S.trDraft.trim() });
      set({ tmSaved: true });
    },

    pickScore: (id, v) => { S.answers[id] = v; if (Object.keys(S.answers).length && S.me) pushDiag(); render(); },
    diagPrev: () => set({ page: Math.max(0, S.page - 1) }),
    diagNext: () => set(S.page >= 3 ? { screen: "result" } : { page: S.page + 1 }),

    setBpWhen: v => set({ bpWhen: v }), setBpHow: v => set({ bpHow: v }), setBpBest: v => set({ bpBest: v }),
    sendBp: async () => {
      const how = S.bpHow.trim();
      if (!how || !S.me) return;
      await window.LGWS.push("bp", S.me.name, { name: S.me.name, team: S.me.teamName, teamNo: S.me.teamNo, when: S.bpWhen.trim(), how, best: S.bpBest.trim() });
      set({ bpSaved: true });
    },

    nextAct: () => {
      const idx = ACTS.findIndex(a => a.key === S.screen);
      const nx = ACTS[idx + 1];
      if (nx) A.go(nx.key);
    },

    // ---- AI 코치 ----
    coachSet: (k, v) => { S.coach[k] = v; render(); },
    coachToggleNeed: v => {
      const arr = S.coach.need;
      const i = arr.indexOf(v);
      if (i >= 0) arr.splice(i, 1); else if (arr.length < 2) arr.push(v);
      render();
    },
    coachStepTo: n => set({ coachStep: n }),
    coachRun: async () => {
      set({ coach: Object.assign({}, S.coach, { loading: true, error: "" }) });
      try {
        const r = await fetch("/api/coach", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({
            anonId: S.me ? S.me.name : "익명",
            observed: { positive: S.coach.posObs, negative: S.coach.negObs, recent: S.coach.recent },
            competence: S.coach.competence, motivation: S.coach.motivation,
            leaderThoughts: S.coach.need,
            myChange: S.coach.change === "__custom__" ? S.coach.changeCustom : S.coach.change,
          }),
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "AI 호출에 실패했습니다.");
        set({ coach: Object.assign({}, S.coach, { loading: false, result: j }), coachStep: 5 });
      } catch (e) {
        set({ coach: Object.assign({}, S.coach, { loading: false, error: e.message || "오류가 발생했습니다." }) });
      }
    },
    coachToggleChosen: i => {
      const arr = S.coach.chosen;
      const p = arr.indexOf(i);
      if (p >= 0) arr.splice(p, 1); else arr.push(i);
      render();
    },
    coachSavePlan: async () => {
      if (!S.me) return;
      const plan = {
        name: S.me.name, team: S.me.teamName, teamNo: S.me.teamNo,
        targetName: S.coach.targetName, competence: S.coach.competence, motivation: S.coach.motivation,
        quadrant: quadrantOf(S.coach.competence, S.coach.motivation).label,
        posObs: S.coach.posObs, negObs: S.coach.negObs,
        need: S.coach.need, myChange: S.coach.change === "__custom__" ? S.coach.changeCustom : S.coach.change,
        approaches: (S.coach.result && S.coach.result.approaches || []).filter((_, i) => S.coach.chosen.includes(i)),
        purpose: S.coach.purpose, savedAt: new Date().toISOString(),
      };
      await window.LGWS.push("coach", S.me.name, plan);
      set({ coach: Object.assign({}, S.coach, { planSaved: true }) });
    },
  };

  async function pushDiag() {
    let total = 0; Object.keys(S.answers).forEach(k => total += S.answers[k]);
    await window.LGWS.push("diag", S.me.name, { total, count: Object.keys(S.answers).length, team: S.me.teamName });
  }

  function quadrantOf(c, m) {
    const boundary = [5, 6].includes(c) || [5, 6].includes(m);
    let label, focus;
    if (c >= 6 && m >= 6) { label = "핵심 인력"; focus = "이미 갖춘 역량과 동기를 더 큰 역할과 자율성으로 연결해볼 필요가 있습니다."; }
    else if (c >= 6 && m <= 5) { label = "동기부여 인력"; focus = "이미 갖고 있는 역량을 활용하면서, 최근 동기가 낮아진 이유를 먼저 확인해볼 필요가 있습니다."; }
    else if (c <= 5 && m >= 6) { label = "집중육성 인력"; focus = "의욕은 있는 만큼, 구체적인 업무 방법과 기준을 단계적으로 지원해볼 필요가 있습니다."; }
    else { label = "주의관리 인력"; focus = "역량과 동기 모두 현재 어려움이 있는 상태이니, 가장 작은 성공 경험부터 함께 만들어볼 필요가 있습니다."; }
    return { label, focus, boundary };
  }

  // ---------- 렌더 ----------
  // 매 입력마다 전체를 다시 그리는 구조라, 포커스/커서 위치를 저장했다가 다시 그린 뒤 복원한다.
  function paint(html, bind) {
    const active = document.activeElement;
    const id = active && root.contains(active) ? active.id : "";
    const selStart = id && "selectionStart" in active ? active.selectionStart : null;
    const selEnd = id && "selectionEnd" in active ? active.selectionEnd : null;
    root.innerHTML = html;
    bind();
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.focus();
        if (selStart != null && el.setSelectionRange) { try { el.setSelectionRange(selStart, selEnd); } catch (e) {} }
      }
    }
  }
  function render() {
    if (!S.me) { paint(joinScreen(), bindJoin); return; }
    paint(shell(), bindShell);
  }

  function joinScreen() {
    const ready = S.inCode.length === 4 && S.inName.trim().length > 0 && S.inTeamNo > 0;
    return `
    <div class="pad" style="display:flex;flex-direction:column;gap:16px;min-height:100vh">
      <div style="display:flex;gap:8px">
        <div style="width:24px;height:36px;background:#111318;border-radius:99px;display:flex;align-items:center;justify-content:center"><div style="width:14px;height:14px;border-radius:99px;background:#E10600"></div></div>
        <div style="width:24px;height:36px;background:#111318;border-radius:99px;display:flex;align-items:center;justify-content:center"><div style="width:14px;height:14px;border-radius:99px;background:#FFD400"></div></div>
        <div style="width:24px;height:36px;background:#111318;border-radius:99px;display:flex;align-items:center;justify-content:center"><div style="width:14px;height:14px;border-radius:99px;background:#00D2BE"></div></div>
      </div>
      <div>
        <div class="kicker">2026 LG전자 서비스센터 반장 워크숍</div>
        <h1>반장 리더십 RACE</h1>
      </div>
      <div class="bar"></div>
      <label><span class="lbl">입장코드</span>
        <input id="f-code" type="text" inputmode="numeric" maxlength="4" placeholder="숫자 4자리 (강사 안내)" value="${esc(S.inCode)}"></label>
      <label><span class="lbl">이름</span>
        <input id="f-name" type="text" placeholder="이름을 입력하세요" value="${esc(S.inName)}"></label>
      <div>
        <div class="lbl" style="margin-bottom:7px">오늘 배정된 조 번호</div>
        <div class="grid8">${[1,2,3,4,5,6,7,8].map(n => `<button class="pick ${S.inTeamNo===n?'on':''}" data-team="${n}">${n}</button>`).join("")}</div>
      </div>
      <label><span class="lbl">우리 조 팀명</span>
        <input id="f-teamname" type="text" placeholder="예) 피트크루" value="${esc(S.inTeamName)}"></label>
      ${S.joinError ? `<div class="banner banner-err">${esc(S.joinError)}</div>` : ""}
      <button id="f-join" class="btn ${ready ? "btn-primary" : "btn-disabled"}">입장하기</button>
      <div class="muted">같은 이름으로 다시 접속하면 기존 참가자로 이어집니다.</div>
    </div>`;
  }
  function bindJoin() {
    root.querySelector("#f-code").oninput = e => A.setCode(e.target.value);
    root.querySelector("#f-name").oninput = e => A.setName(e.target.value);
    root.querySelector("#f-teamname").oninput = e => A.setTeamName(e.target.value);
    root.querySelectorAll("[data-team]").forEach(b => b.onclick = () => A.pickTeam(+b.dataset.team));
    root.querySelector("#f-join").onclick = A.join;
  }

  function shell() {
    const state = window.LGWS.state();
    const answered = Object.keys(S.answers).length;
    const stateOf = {
      team: ((state.teams || {})[S.me.teamNo] || {}).name || "미입력",
      diag: answered + " / 20 응답",
      result: answered === 20 ? "확인 가능" : "진단 후 확인",
      bp: S.bpSaved ? "전송 완료" : "미전송",
      coach: S.coach.planSaved ? "저장 완료" : "진행 전",
    };
    const act = ACTS.find(a => a.key === S.screen);
    const meLabel = (S.me.teamName ? `TEAM ${S.me.teamNo} ${S.me.teamName} · ` : "") + S.me.name;
    return `
    ${S.indexOpen ? `
      <div class="drawer-mask" id="drawer-mask"></div>
      <div class="drawer">
        <div style="height:4px;background:#E10600"></div>
        <div style="padding:20px 18px 14px;border-bottom:1px solid rgba(255,255,255,.12)">
          <div class="lbl">TODAY'S ACTIVITIES</div><div style="font-size:19px;font-weight:700;margin-top:4px">오늘의 활동</div>
        </div>
        <div style="flex:1;overflow-y:auto;padding:10px 0">
          ${ACTS.map(a => `<button class="drawer-item ${S.screen===a.key?'cur':''}" data-go="${a.key}" style="border-left-color:${a.accent}">
            <span style="font-weight:900;font-size:12px;color:${a.accent}">${a.no}</span>
            <span style="font-size:16px;font-weight:700">${a.label}</span>
            <span style="font-size:13px;color:#B4BBC7">${stateOf[a.key]}</span></button>`).join("")}
        </div>
        <button id="drawer-logout" class="btn btn-ghost" style="margin:12px 18px 22px;width:auto">퇴장하기</button>
      </div>` : ""}

    <div class="topbar">
      <div style="height:4px;background:#E10600"></div>
      <div class="topbar-inner">
        <button id="hamburger" class="hamburger" style="display:flex;align-items:center;gap:10px">
          <span style="display:flex;flex-direction:column;gap:4px"><span></span><span style="background:#fff"></span><span style="background:#fff"></span></span>
          <span style="display:flex;flex-direction:column;gap:2px;text-align:left">
            <span style="font-weight:900;font-size:13px">반장 리더십 RACE</span>
            <span style="font-size:13px;color:#DCE0E7">${esc(meLabel)}</span>
          </span>
        </button>
        <span class="live"><span class="dot"></span>LIVE</span>
      </div>
      <div style="padding:0 16px 10px"><span class="actchip"><b>${act.no}</b><span>${act.label}</span></span></div>
    </div>

    <div class="pad" style="flex:1;display:flex;flex-direction:column;gap:18px">
      ${S.screen === "team" ? teamScreen(state) : ""}
      ${S.screen === "diag" ? diagScreen() : ""}
      ${S.screen === "result" ? resultScreen() : ""}
      ${S.screen === "bp" ? bpScreen() : ""}
      ${S.screen === "coach" ? coachScreen() : ""}
      ${S.screen !== "coach" ? `<button id="next-act" class="nextbar">
        <span style="display:flex;flex-direction:column;gap:3px"><span style="font-size:19px;font-weight:700">다음으로</span>
        <span style="font-size:13px;opacity:.85">${(ACTS[ACTS.findIndex(a=>a.key===S.screen)+1]||{}).label || ""}</span></span>
        <span style="font-size:26px">→</span></button>` : ""}
    </div>`;
  }

  function teamScreen(state) {
    const TEAM_COLORS = ["#00D2BE", "#FF8000", "#3671C6", "#FFD400", "#FF3AA0", "#6C4BF6"];
    const color = TEAM_COLORS[(S.me.teamNo || 1) - 1];
    const ready = S.tnDraft.trim() && S.trDraft.trim();
    return `
    <div>
      <div class="eyebrow">ONE TEAM</div>
      <h2>우리 팀의 이름과 구호를 정해주세요</h2>
      <p class="muted">조별로 대표 1명만 입력합니다. 전송하면 강사 화면에 바로 표기됩니다.</p>
    </div>
    <div class="card" style="border-left:4px solid ${color};display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;align-items:baseline;gap:10px"><span style="font-weight:900;font-size:20px;color:${color}">${S.me.teamNo}조</span><span class="muted">${esc(S.me.name)}</span></div>
      <label><span class="lbl">팀 이름</span><input id="c-tn" type="text" placeholder="예) 피트크루" value="${esc(S.tnDraft)}"></label>
      <label><span class="lbl">구호</span><textarea id="c-ts" rows="2" placeholder="예) 먼저 보고 먼저 움직인다">${esc(S.tsDraft)}</textarea></label>
      <label><span class="lbl">대표 이름</span><input id="c-tr" type="text" placeholder="입력하는 대표 이름" value="${esc(S.trDraft)}"></label>
      <button id="c-send" class="btn ${ready ? 'btn-teal' : 'btn-disabled'}">${S.tmSaved ? "전송 완료 · 다시 전송" : "전송"}</button>
    </div>
    ${S.tmSaved ? `<div class="banner banner-ok">전송되었습니다. 다시 수정해 전송하면 강사 화면도 함께 바뀝니다.</div>` : ""}`;
  }

  function diagScreen() {
    const area = AREAS[S.page];
    const answered = Object.keys(S.answers).length;
    return `
    <div>
      <div class="eyebrow">SELF DIAGNOSIS</div>
      <h2>반장 리더십 자가진단</h2>
      <p class="muted">평소 현장에서의 나와 가까운 응답을 골라주세요.</p>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:14px;color:#DCE0E7">
      <span>영역 ${S.page + 1} · ${area.name}</span><span style="font-weight:900;font-size:17px;color:#fff">${answered} / 20</span>
    </div>
    <div class="progress"><i style="width:${Math.round(answered/20*100)}%"></i></div>
    <div style="display:flex;gap:6px;font-size:11px;color:#B4BBC7;text-align:center">
      <span style="flex:1">전혀 아니다</span><span style="flex:1">아니다</span><span style="flex:1">보통</span><span style="flex:1">그렇다</span><span style="flex:1">매우 그렇다</span></div>
    ${area.items.map((text, i) => { const id = S.page*5+i; return `
      <div class="q" style="border-left-color:${S.answers[id] ? area.color : 'rgba(255,255,255,.16)'}">
        <div style="display:flex;gap:10px;margin-bottom:10px"><span style="font-weight:900;color:#B4BBC7;min-width:22px">${id+1}</span><span>${esc(text)}</span></div>
        <div class="scale">${[1,2,3,4,5].map(v => `<button class="scalebtn ${S.answers[id]===v?'on':''}" data-id="${id}" data-v="${v}" style="${S.answers[id]===v?`background:${area.color};border-color:${area.color}`:''}">${v}</button>`).join("")}</div>
      </div>`; }).join("")}
    <div style="display:flex;gap:8px">
      <button id="d-prev" class="btn btn-ghost" style="flex:1">이전</button>
      <button id="d-next" class="btn btn-primary" style="flex:2">${S.page>=3?"결과 보기":"다음 영역"}</button>
    </div>`;
  }

  function resultScreen() {
    const scores = AREAS.map(a => 0);
    AREAS.forEach((a, ai) => { for (let i=0;i<5;i++) scores[ai] += S.answers[ai*5+i] || 0; });
    const total = scores.reduce((n,v)=>n+v,0);
    return `
    <div><div class="eyebrow">DIAGNOSIS RESULT</div><h2>나의 진단 결과</h2></div>
    <div class="score-hero">
      <div style="font-weight:700;font-size:11px;letter-spacing:.14em;opacity:.85">총점</div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between"><span class="score-num">${total}</span><span style="font-weight:900;font-size:20px">/ 100</span></div>
      <div style="font-size:15px;line-height:1.5;opacity:.92">${total ? "네 영역 중 가장 낮은 영역을 오늘의 실행 목표로 연결해보세요." : "자가진단을 먼저 완료해주세요."}</div>
    </div>
    ${AREAS.map((a,i)=>`<div class="area"><div style="display:flex;justify-content:space-between"><span style="font-weight:700">${a.name}</span><span style="font-weight:900;color:${a.color}">${scores[i]} / 25</span></div>
      <div class="progress" style="margin-bottom:0"><i style="width:${Math.round(scores[i]/25*100)}%;background:${a.color}"></i></div></div>`).join("")}
    <div class="muted">영역별 5문항 합계(5~25)이며, 네 영역을 더한 값이 총점입니다.</div>`;
  }

  function bpScreen() {
    const ready = S.bpHow.trim();
    return `
    <div><div class="eyebrow">OUR MORNING</div><h2>우리 반은 아침 조회를 이렇게 하고 있다</h2>
      <p class="muted">지금 우리 반의 방식을 짧게 적어주세요. 강사 화면에 모아서 함께 봅니다.</p></div>
    <div class="card" style="border-left:4px solid #3671C6;display:flex;flex-direction:column;gap:12px">
      <label><span class="lbl">주기 · 시간</span><input id="b-when" type="text" placeholder="예) 매일 아침 / 10분" value="${esc(S.bpWhen)}"></label>
      <label><span class="lbl">우리 반의 진행 방식</span><textarea id="b-how" rows="3" placeholder="예) 어제 지연 건을 먼저 확인하고, 오늘 예약 순서를 함께 본다">${esc(S.bpHow)}</textarea></label>
      <label><span class="lbl">가장 효과 있었던 한 가지</span><input id="b-best" type="text" placeholder="예) 인정 한마디를 마지막에 넣는다" value="${esc(S.bpBest)}"></label>
      <button id="b-send" class="btn ${ready ? 'btn-primary' : 'btn-disabled'}" style="background:${ready?'#3671C6':''}">${S.bpSaved ? "전송 완료 · 다시 전송" : "전송"}</button>
    </div>`;
  }

  // ---------- AI 코치 (신규 챕터) ----------
  function coachScreen() {
    const c = S.coach;
    if (c.planSaved) return coachSaved();
    switch (S.coachStep) {
      case 0: return coachIntro();
      case 1: return coachObserve();
      case 2: return coachScore();
      case 3: return coachType();
      case 4: return coachHypothesis();
      case 5: return coachResult();
      default: return coachIntro();
    }
  }

  function coachIntro() {
    return `
    <div><div class="eyebrow">AI LEADERSHIP COACH</div><h2>AI 리더십 코치</h2>
      <p class="muted">우리 반 구성원을 평가하는 시간이 아닙니다. 최근의 행동을 떠올리고, 지금 이 구성원에게 어떤 리더십이 필요한지 생각해보는 시간입니다.</p>
      <p class="muted">역량과 동기는 상황과 시기에 따라 달라질 수 있습니다. 오늘 만드는 결과는 현재 시점의 리더십 가설(v1.0)입니다.</p></div>
    <div class="banner banner-ok">구성원 실명 대신 이니셜이나 별칭을 사용하고, 실제 관찰한 업무 행동 중심으로 입력해주세요.</div>
    <label><span class="lbl">오늘 조금 더 깊게 생각해보고 싶은 구성원 (이니셜/별칭)</span>
      <input id="co-target" type="text" placeholder="예) K" value="${esc(S.coach.targetName)}"></label>
    <button id="co-start" class="btn ${S.coach.targetName.trim() ? 'btn-primary' : 'btn-disabled'}">이 구성원 살펴보기</button>`;
  }

  function coachObserve() {
    return `
    <div><div class="eyebrow">관찰 사실 정리</div><h2>최근 1년, ${esc(S.coach.targetName)}님은 실제로 어떻게 행동했나요?</h2></div>
    <label><span class="lbl">내가 긍정적으로 보는 모습은 무엇인가요?</span>
      <textarea id="co-pos" rows="2" placeholder="예) 본인이 바쁜 상황에도, 새로 입사한 후배의 수리 방향을 잡아줌">${esc(S.coach.posObs)}</textarea></label>
    <label><span class="lbl">내가 아쉽게 느끼는 모습은 무엇인가요?</span>
      <textarea id="co-neg" rows="2" placeholder="예) 최근 추가 역할 제안에는 예전보다 참여가 줄어듦">${esc(S.coach.negObs)}</textarea></label>
    <div>
      <div class="lbl" style="margin-bottom:8px">최근 모습은 어떤가요?</div>
      <div class="chips">${["비슷한 모습이 반복되고 있음","최근 조금 달라짐","특정 상황에서만 나타남","아직 잘 모르겠음"].map(o=>`<div class="chip ${S.coach.recent===o?'on':''}" data-recent="${esc(o)}">${o}</div>`).join("")}</div>
    </div>
    <button id="co-next1" class="btn ${S.coach.posObs.trim()&&S.coach.negObs.trim() ? 'btn-primary':'btn-disabled'}">현재 상태 생각해보기</button>`;
  }

  function coachScore() {
    return `
    <div><div class="eyebrow">역량·동기 판단</div><h2>관찰 사실을 기준으로 현재 상태를 표시해주세요</h2></div>
    <div class="card">
      <div class="lbl">역량 — 현재 맡은 업무를 어느 정도 안정적으로 수행하나요?</div>
      <div class="slider-val" id="co-comp-val">${S.coach.competence}</div>
      <input id="co-comp" class="slider" type="range" min="1" max="10" value="${S.coach.competence}">
      <div class="muted">1~3 많은 지원 필요 · 4~5 일부 지원 필요 · 6~7 대부분 독립 수행 · 8~10 다른 구성원도 지원 가능</div>
    </div>
    <div class="card">
      <div class="lbl">동기 — 최근 일에 몰입하고 노력하려는 모습은 어느 정도인가요?</div>
      <div class="slider-val" id="co-mot-val">${S.coach.motivation}</div>
      <input id="co-mot" class="slider" type="range" min="1" max="10" value="${S.coach.motivation}">
      <div class="muted">1~3 몰입 행동 잘 안 보임 · 4~5 상황별 차이 · 6~7 꾸준히 참여 · 8~10 자발적·주도적 시도</div>
    </div>
    <button id="co-next2" class="btn btn-primary">현재 위치 확인하기</button>`;
  }

  function coachType() {
    const q = quadrantOf(S.coach.competence, S.coach.motivation);
    return `
    <div><div class="eyebrow">현재 상태 결과</div><h2>현재 관찰한 모습만 보면 ‘${q.label}’에 가까워 보입니다</h2></div>
    <div class="score-hero"><div style="display:flex;justify-content:space-between;font-size:15px"><span>역량 ${S.coach.competence}</span><span>동기 ${S.coach.motivation}</span></div></div>
    ${q.boundary ? `<div class="banner banner-ok">현재 경계에 가까운 위치입니다. 유형 자체보다 앞으로 관찰되는 행동을 함께 확인해보세요.</div>` : ""}
    <div class="card"><div class="lbl" style="margin-bottom:6px">현재 리더십 초점</div><div style="font-size:16px;line-height:1.55">${q.focus}</div></div>
    <div class="muted">유형보다 중요한 것은 지금 이 구성원에게 어떤 리더십이 필요한지입니다.</div>
    <button id="co-next3" class="btn btn-primary">내 리더십 생각해보기</button>`;
  }

  function coachHypothesis() {
    const ready = S.coach.need.length > 0 && (S.coach.change && S.coach.change !== "__custom__" || (S.coach.change === "__custom__" && S.coach.changeCustom.trim()));
    return `
    <div><div class="eyebrow">반장의 리더십 가설</div><h2>지금 이 구성원에게 가장 필요한 것은 무엇이라고 생각하시나요?</h2><p class="muted">최대 2개까지 선택할 수 있습니다.</p></div>
    <div class="chips">${NEED_OPTIONS.map(o=>`<div class="chip ${S.coach.need.includes(o)?'on':''}" data-need="${esc(o)}">${o}</div>`).join("")}</div>
    <div><h2 style="font-size:18px;margin-top:22px">반장님이 지금과 조금 다르게 해볼 수 있는 것은 무엇일까요?</h2></div>
    <div class="chips">${CHANGE_OPTIONS.map(o=>`<div class="chip ${S.coach.change===o?'on':''}" data-change="${esc(o)}">${o}</div>`).join("")}
      <div class="chip ${S.coach.change==='__custom__'?'on':''}" data-change="__custom__">직접 입력</div></div>
    ${S.coach.change === "__custom__" ? `<input id="co-change-custom" type="text" placeholder="직접 입력" value="${esc(S.coach.changeCustom)}" style="margin-top:8px">` : ""}
    ${S.coach.error ? `<div class="banner banner-err">${esc(S.coach.error)}</div>` : ""}
    <button id="co-ai" class="btn ${ready ? 'btn-primary' : 'btn-disabled'}" ${S.coach.loading ? 'disabled' : ''}>${S.coach.loading ? "AI가 생각하는 중..." : "AI 코치에게 의견 받아보기"}</button>
    ${S.coach.loading ? `<div class="spinner"></div>` : ""}`;
  }

  function coachResult() {
    const r = S.coach.result || {};
    const approaches = r.approaches || [];
    const canProceed = S.coach.chosen.length > 0;
    return `
    <div><div class="eyebrow">AI COACHING</div><h2>AI 코치의 생각</h2><p class="muted">AI는 정답이 아닙니다. 반장님의 판단을 보완하는 참고 의견입니다.</p></div>
    ${r.good_start ? `<div class="card"><div class="lbl" style="margin-bottom:6px;color:#00D2BE">지금 판단에서 좋은 출발점</div><div style="font-size:15px;line-height:1.55">${esc(r.good_start)}</div></div>` : ""}
    ${r.check_more ? `<div class="card"><div class="lbl" style="margin-bottom:6px;color:#FFD400">한 번 더 확인해볼 것</div><div style="font-size:15px;line-height:1.55">${esc(r.check_more)}</div></div>` : ""}
    ${r.other_view ? `<div class="card"><div class="lbl" style="margin-bottom:6px;color:#3671C6">놓치고 있을 수 있는 관점</div><div style="font-size:15px;line-height:1.55">${esc(r.other_view)}</div></div>` : ""}
    <div class="lbl" style="margin:16px 0 4px">시도해볼 접근 — 선택 또는 수정해서 포함하세요</div>
    ${approaches.map((a,i)=>`
      <div class="approach ${S.coach.chosen.includes(i)?'sel':''}">
        <div style="font-weight:700;font-size:16px">${esc(a.title||"")}</div>
        <div style="font-size:14px;color:#DCE0E7;margin-top:6px">${esc(a.how||"")}</div>
        <div style="font-size:13px;color:#B4BBC7;margin-top:6px">${esc(a.why||"")}</div>
        <div class="rowbtns"><button class="ch-toggle ${S.coach.chosen.includes(i)?'sel':''}" data-i="${i}">${S.coach.chosen.includes(i)?"선택됨":"선택"}</button></div>
      </div>`).join("") || `<div class="muted">${r.raw ? esc(r.raw) : "결과가 없습니다."}</div>`}
    ${r.avoid ? `<div class="banner banner-err">피해야 할 접근: ${esc(r.avoid)}</div>` : ""}
    <button id="co-plan" class="btn ${canProceed?'btn-teal':'btn-disabled'}">내 리더십 전략으로 정리</button>`;
  }

  function coachSaved() {
    const c = S.coach;
    return `
    <div><div class="eyebrow">LEADERSHIP PLAN v1.0</div><h2>${esc(c.targetName)} · 리더십 플랜</h2></div>
    <div class="card">
      <div class="lbl" style="margin-bottom:6px">현재 상태</div>
      <div>역량 ${c.competence} / 동기 ${c.motivation} · ${quadrantOf(c.competence,c.motivation).label}</div>
    </div>
    <div class="card">
      <div class="lbl" style="margin-bottom:6px">지금 필요한 리더십</div>
      <div>${c.need.map(esc).join(", ")}</div>
    </div>
    <div class="card">
      <div class="lbl" style="margin-bottom:6px">내가 먼저 바꿔볼 행동</div>
      <div>${esc(c.change === "__custom__" ? c.changeCustom : c.change)}</div>
    </div>
    <div class="banner banner-ok">저장되었습니다. 실제 대화에서는 오늘 만든 가설을 확인하며 조정해보세요.</div>
    <button id="co-restart" class="btn btn-ghost">다른 구성원으로 다시 시작</button>`;
  }

  function bindShell() {
    const q = s => root.querySelector(s), qa = s => root.querySelectorAll(s);
    if (q("#drawer-mask")) q("#drawer-mask").onclick = A.toggleIndex;
    if (q("#hamburger")) q("#hamburger").onclick = A.toggleIndex;
    if (q("#drawer-logout")) q("#drawer-logout").onclick = A.logout;
    qa("[data-go]").forEach(b => b.onclick = () => A.go(b.dataset.go));
    if (q("#next-act")) q("#next-act").onclick = A.nextAct;

    if (S.screen === "team") {
      q("#c-tn").oninput = e => A.setTn(e.target.value);
      q("#c-ts").oninput = e => A.setTs(e.target.value);
      q("#c-tr").oninput = e => A.setTr(e.target.value);
      q("#c-send").onclick = A.sendTeam;
    }
    if (S.screen === "diag") {
      qa(".scalebtn").forEach(b => b.onclick = () => A.pickScore(+b.dataset.id, +b.dataset.v));
      q("#d-prev").onclick = A.diagPrev; q("#d-next").onclick = A.diagNext;
    }
    if (S.screen === "bp") {
      q("#b-when").oninput = e => A.setBpWhen(e.target.value);
      q("#b-how").oninput = e => A.setBpHow(e.target.value);
      q("#b-best").oninput = e => A.setBpBest(e.target.value);
      q("#b-send").onclick = A.sendBp;
    }
    if (S.screen === "coach") bindCoach(q, qa);
  }

  function bindCoach(q, qa) {
    const c = S.coach;
    if (c.planSaved) { if (q("#co-restart")) q("#co-restart").onclick = () => set({ coach: { targetName:"", posObs:"", negObs:"", recent:"", competence:5, motivation:5, need:[], change:"", changeCustom:"", purpose:"", loading:false, error:"", result:null, chosen:[], planSaved:false }, coachStep: 0 }); return; }
    switch (S.coachStep) {
      case 0:
        q("#co-target").oninput = e => A.coachSet("targetName", e.target.value);
        if (q("#co-start")) q("#co-start").onclick = () => c.targetName.trim() && A.coachStepTo(1);
        break;
      case 1:
        q("#co-pos").oninput = e => A.coachSet("posObs", e.target.value);
        q("#co-neg").oninput = e => A.coachSet("negObs", e.target.value);
        qa("[data-recent]").forEach(el => el.onclick = () => A.coachSet("recent", el.dataset.recent));
        if (q("#co-next1")) q("#co-next1").onclick = () => c.posObs.trim() && c.negObs.trim() && A.coachStepTo(2);
        break;
      case 2:
        // 드래그 중 전체 리렌더로 슬라이더가 끊기지 않도록, 값만 직접 갱신한다.
        q("#co-comp").oninput = e => { S.coach.competence = +e.target.value; q("#co-comp-val").textContent = S.coach.competence; };
        q("#co-mot").oninput = e => { S.coach.motivation = +e.target.value; q("#co-mot-val").textContent = S.coach.motivation; };
        q("#co-next2").onclick = () => A.coachStepTo(3);
        break;
      case 3:
        q("#co-next3").onclick = () => A.coachStepTo(4);
        break;
      case 4:
        qa("[data-need]").forEach(el => el.onclick = () => A.coachToggleNeed(el.dataset.need));
        qa("[data-change]").forEach(el => el.onclick = () => A.coachSet("change", el.dataset.change));
        if (q("#co-change-custom")) q("#co-change-custom").oninput = e => A.coachSet("changeCustom", e.target.value);
        q("#co-ai").onclick = A.coachRun;
        break;
      case 5:
        qa(".ch-toggle").forEach(el => el.onclick = () => A.coachToggleChosen(+el.dataset.i));
        if (q("#co-plan")) q("#co-plan").onclick = () => S.coach.chosen.length && A.coachSavePlan();
        break;
    }
  }
})();
