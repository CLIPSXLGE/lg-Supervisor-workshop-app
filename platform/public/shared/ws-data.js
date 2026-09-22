/* ─────────────────────────────────────────────────────────────
   WSData — 반장 리더십 RACE 워크숍 데이터 레이어 (LG_SM_workshop 구조 참고)

   기준값(scope) = session_code(차수코드) + day(로컬 날짜)
     session_code : ws-config.js 의 WS_ROUNDS 에 등록된 4자리 차수코드
                    (예: 1111 = 1차). 센터 조회 없이 코드 자체가 session_code.
     day          : 같은 차수를 다른 날 리허설해도 데이터가 섞이지 않도록.

   백엔드는 두 가지 중 하나로 자동 선택된다.
     LIVE  : ws-config.js 에 Supabase url/anonKey 가 채워진 경우.
             PostgREST 를 fetch 로 직접 호출한다 (SDK 의존성 없음).
     LOCAL : 설정이 비어 있는 경우. localStorage + BroadcastChannel.

   테이블은 supabase/schema.sql 참고.
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var CFG = window.WS_SUPABASE || {};
  var ROUNDS = window.WS_ROUNDS || {};
  var LIVE = !!(CFG.url && CFG.anonKey);

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function newId() { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function toSessionCode(input) { return String(input || '').replace(/\D/g, '').slice(0, 4); }

  var listeners = [];
  function emit() { listeners.forEach(function (f) { try { f(); } catch (e) {} }); }

  /* ── LIVE : Supabase PostgREST ───────────────────────────── */
  var BASE = String(CFG.url || '').replace(/\/+$/, '') + '/rest/v1/';
  function rest(path, opts) {
    opts = opts || {};
    var headers = { apikey: CFG.anonKey, Authorization: 'Bearer ' + CFG.anonKey, 'Content-Type': 'application/json' };
    if (opts.prefer) headers['Prefer'] = opts.prefer;
    return fetch(BASE + path, { method: opts.method || 'GET', headers: headers, body: opts.body ? JSON.stringify(opts.body) : undefined })
      .then(function (r) {
        if (!r.ok) return r.text().then(function (t) { throw new Error('[WSData] ' + r.status + ' ' + path + ' :: ' + t); });
        if (r.status === 204) return null;
        return r.text().then(function (t) { return t ? JSON.parse(t) : null; });
      });
  }
  function soft(p, fallback) { return p.catch(function (e) { if (window.WS_DEBUG) console.warn(e); return fallback; }); }
  function scopeQs(code, day) { return 'session_code=eq.' + encodeURIComponent(code) + '&day=eq.' + day; }

  var liveStore = {
    listParticipants: function (code, day) {
      return soft(rest('ws_participants?' + scopeQs(code, day) + '&order=joined_at.asc'), []);
    },
    findParticipant: function (code, day, name, team) {
      var q = 'ws_participants?' + scopeQs(code, day) + '&name=eq.' + encodeURIComponent(name);
      if (team != null && !isNaN(Number(team))) q += '&team=eq.' + Number(team);
      return soft(rest(q + '&limit=1'), []).then(function (rows) { return (rows || [])[0] || null; });
    },
    addParticipant: function (row) {
      return rest('ws_participants', { method: 'POST', body: [row], prefer: 'return=representation,resolution=merge-duplicates' })
        .then(function (rows) { return (rows || [])[0] || row; })
        .catch(function (e) { if (window.WS_DEBUG) console.warn(e); return row; });
    },
    getTeamInfo: function (code, day) { return soft(rest('ws_team_info?' + scopeQs(code, day) + '&order=team.asc'), []); },
    setTeamInfo: function (row) {
      return rest('ws_team_info?on_conflict=session_code,day,team', { method: 'POST', body: [row], prefer: 'resolution=merge-duplicates,return=minimal' })
        .then(function () { return true; }).catch(function (e) { if (window.WS_DEBUG) console.warn(e); return false; });
    },
    listResponses: function (code, day, questionId) {
      var q = 'ws_responses?' + scopeQs(code, day);
      if (questionId) {
        q += Object.prototype.toString.call(questionId) === '[object Array]'
          ? '&question_id=in.(' + questionId.map(encodeURIComponent).join(',') + ')'
          : '&question_id=eq.' + encodeURIComponent(questionId);
      }
      return soft(rest(q + '&order=updated_at.asc'), []);
    },
    upsertResponses: function (rows) {
      if (!rows.length) return Promise.resolve(true);
      return rest('ws_responses?on_conflict=session_code,day,participant_id,question_id', { method: 'POST', body: rows, prefer: 'resolution=merge-duplicates,return=minimal' })
        .then(function () { return true; }).catch(function (e) { if (window.WS_DEBUG) console.warn(e); return false; });
    },
    getCoachPlans: function (code, day) { return soft(rest('ws_coach_plans?' + scopeQs(code, day)), []); },
    setCoachPlan: function (row) {
      return rest('ws_coach_plans?on_conflict=session_code,day,participant_id', { method: 'POST', body: [row], prefer: 'resolution=merge-duplicates,return=minimal' })
        .then(function () { return true; }).catch(function (e) { if (window.WS_DEBUG) console.warn(e); return false; });
    },
    logLogin: function (row) {
      return rest('ws_instructor_log', { method: 'POST', body: [row], prefer: 'return=minimal' })
        .then(function () { return true; }).catch(function (e) { if (window.WS_DEBUG) console.warn(e); return false; });
    },
  };

  /* ── LOCAL : localStorage + BroadcastChannel ─────────────── */
  var CH = null;
  try { CH = new BroadcastChannel('lgws_local'); } catch (e) {}
  if (CH) CH.onmessage = function () { emit(); };
  function lsKey(code, day, table) { return 'lgws/' + code + '/' + day + '/' + table; }
  function lsRead(code, day, table, dflt) { try { var raw = localStorage.getItem(lsKey(code, day, table)); return raw ? JSON.parse(raw) : dflt; } catch (e) { return dflt; } }
  function lsWrite(code, day, table, val) { try { localStorage.setItem(lsKey(code, day, table), JSON.stringify(val)); } catch (e) {} if (CH) { try { CH.postMessage(1); } catch (e) {} } emit(); return val; }

  var localStore = {
    listParticipants: function (code, day) { return Promise.resolve(lsRead(code, day, 'participants', [])); },
    findParticipant: function (code, day, name, team) {
      var rows = lsRead(code, day, 'participants', []);
      return Promise.resolve(rows.filter(function (p) {
        if (p.name !== name) return false;
        if (team == null || isNaN(Number(team))) return true;
        return Number(p.team) === Number(team);
      })[0] || null);
    },
    addParticipant: function (row) {
      var rows = lsRead(row.session_code, row.day, 'participants', []);
      rows.push(row); lsWrite(row.session_code, row.day, 'participants', rows);
      return Promise.resolve(row);
    },
    getTeamInfo: function (code, day) { return Promise.resolve(lsRead(code, day, 'teams', [])); },
    setTeamInfo: function (row) {
      var rows = lsRead(row.session_code, row.day, 'teams', []).filter(function (t) { return t.team !== row.team; });
      rows.push(row); lsWrite(row.session_code, row.day, 'teams', rows);
      return Promise.resolve(true);
    },
    listResponses: function (code, day, questionId) {
      var rows = lsRead(code, day, 'responses', []);
      if (questionId) {
        var want = Object.prototype.toString.call(questionId) === '[object Array]' ? questionId : [questionId];
        rows = rows.filter(function (r) { return want.indexOf(r.question_id) >= 0; });
      }
      return Promise.resolve(rows);
    },
    upsertResponses: function (rows) {
      if (!rows.length) return Promise.resolve(true);
      var code = rows[0].session_code, day = rows[0].day;
      var cur = lsRead(code, day, 'responses', []);
      rows.forEach(function (n) {
        cur = cur.filter(function (r) { return !(r.participant_id === n.participant_id && r.question_id === n.question_id); });
        cur.push(n);
      });
      lsWrite(code, day, 'responses', cur);
      return Promise.resolve(true);
    },
    getCoachPlans: function (code, day) { return Promise.resolve(lsRead(code, day, 'coach', [])); },
    setCoachPlan: function (row) {
      var rows = lsRead(row.session_code, row.day, 'coach', []).filter(function (p) { return p.participant_id !== row.participant_id; });
      rows.push(row); lsWrite(row.session_code, row.day, 'coach', rows);
      return Promise.resolve(true);
    },
    logLogin: function (row) {
      var rows = lsRead(row.session_code, row.day, 'login_log', []);
      rows.push(row); lsWrite(row.session_code, row.day, 'login_log', rows);
      return Promise.resolve(true);
    },
  };

  var S = LIVE ? liveStore : localStore;

  var WSData = {
    today: today,
    toSessionCode: toSessionCode,
    isLive: function () { return LIVE; },
    mode: function () { return LIVE ? 'LIVE' : 'LOCAL'; },
    onChange: function (fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (f) { return f !== fn; }); }; },

    /* 강사 로그인 — 차수코드 4자리 + 비밀번호(=코드와 동일) + 강사명 */
    verifyInstructor: function (input, password, instructorName) {
      var code = toSessionCode(input);
      var label = ROUNDS[code];
      if (!label) return Promise.resolve({ ok: false, reason: '등록되지 않은 차수코드입니다.' });
      if (String(password || '').trim() !== code) return Promise.resolve({ ok: false, reason: '비밀번호가 올바르지 않습니다.' });
      if (!String(instructorName || '').trim()) return Promise.resolve({ ok: false, reason: '강사명을 입력해 주세요.' });
      return Promise.resolve({ ok: true, session: { session_code: code, round_label: label, day: today() } });
    },
    logInstructorLogin: function (sessionCode, instructorName) {
      return S.logLogin({ session_code: toSessionCode(sessionCode), day: today(), instructor_name: String(instructorName || '').trim(), login_time: new Date().toISOString() });
    },
    getSession: function (sessionCode) {
      var code = toSessionCode(sessionCode);
      var label = ROUNDS[code];
      return Promise.resolve(label ? { session_code: code, round_label: label, day: today() } : null);
    },

    getParticipants: function (sessionCode) { return S.listParticipants(toSessionCode(sessionCode), today()); },
    /* 이름 + 조 번호로 입장. 같은 이름+조면 기존 참가자로 이어진다. */
    joinParticipant: function (sessionCode, name, team) {
      var code = toSessionCode(sessionCode), day = today(), n = String(name || '').trim();
      return S.findParticipant(code, day, n, team).then(function (found) {
        if (found) return found;
        return S.addParticipant({ participant_id: newId(), session_code: code, day: day, name: n, team: team == null ? null : Number(team), joined_at: new Date().toISOString() });
      });
    },

    getTeamInfoAll: function (sessionCode) { return S.getTeamInfo(toSessionCode(sessionCode), today()); },
    submitTeamInfo: function (sessionCode, team, info) {
      return S.setTeamInfo({ session_code: toSessionCode(sessionCode), day: today(), team: Number(team), name: info.name || '', slogan: info.slogan || '', rep: info.rep || '', updated_at: new Date().toISOString() });
    },

    getResponses: function (sessionCode, questionId) { return S.listResponses(toSessionCode(sessionCode), today(), questionId).then(function (r) { return r || []; }); },
    submitResponses: function (sessionCode, participantId, answers) {
      var code = toSessionCode(sessionCode), day = today(), now = new Date().toISOString();
      var rows = (answers || []).filter(function (a) { return a && a.text != null && String(a.text).trim() !== ''; })
        .map(function (a) { return { session_code: code, day: day, participant_id: participantId, question_id: a.question_id, text: String(a.text).trim(), updated_at: now }; });
      return S.upsertResponses(rows);
    },

    getCoachPlans: function (sessionCode) { return S.getCoachPlans(toSessionCode(sessionCode), today()); },
    submitCoachPlan: function (sessionCode, participantId, plan) {
      return S.setCoachPlan({ session_code: toSessionCode(sessionCode), day: today(), participant_id: participantId, plan: plan, updated_at: new Date().toISOString() });
    },

    /* 교육생 접속 주소 — 강사 화면과 같은 배포에서 서비스되므로 현재 오리진을 그대로 쓴다 */
    joinUrl: function (accessCode) {
      var origin = /^https?:$/.test(location.protocol) ? location.origin + '/' : '';
      var base = (origin || CFG.appBase || '').replace(/\/+$/, '/');
      var c = String(accessCode || '').trim();
      return c ? base + '?c=' + encodeURIComponent(c) : base;
    },
  };

  window.WSData = WSData;
  if (window.WS_DEBUG) console.log('[WSData] mode =', WSData.mode());
})();
