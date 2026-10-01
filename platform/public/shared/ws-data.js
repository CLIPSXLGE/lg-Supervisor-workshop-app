/* ─────────────────────────────────────────────────────────────
   WSData — 반장 리더십 RACE 워크숍 데이터 레이어 (LG_SM_workshop 구조 참고)

   기준값(scope) = session_code(차수코드)
     session_code : ws-config.js 의 WS_ROUNDS 에 등록된 4자리 차수코드
                    (예: 1111 = 1차). 센터 조회 없이 코드 자체가 session_code.

   이 워크숍은 1박 2일 과정이라, 같은 사람이 이틀에 걸쳐 입력한 데이터가
   모두 남아 있어야 한다. 그래서 조회/삭제는 session_code만으로 스코프하고
   (날짜로 자르지 않는다), 참가자 식별은 "이름 + 비밀번호" 조합으로 한다.
   같은 이름+비밀번호로 다시 입장하면 기존 participant_id로 이어진다.
   day 컬럼은 각 행이 "언제 저장됐는지" 참고용으로만 남기고, 조회 시에는
   참가자/문항별로 가장 최신(updated_at) 한 건만 남기고 병합해서 보여준다.

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

  /* 같은 키(keyFn)를 가진 행이 여러 날짜에 걸쳐 여러 건 있을 때, updated_at(또는 joined_at)이
     가장 최신인 한 건만 남긴다. 스키마를 건드리지 않고 "날짜로 안 잘리는" 조회를 만드는 핵심. */
  function dedupeLatest(rows, keyFn) {
    var byKey = {};
    (rows || []).forEach(function (r) {
      var k = keyFn(r);
      var ts = r.updated_at || r.joined_at || '';
      if (!byKey[k] || String(ts) > String(byKey[k]._ts)) byKey[k] = Object.assign({ _ts: ts }, r);
    });
    return Object.keys(byKey).map(function (k) { var r = byKey[k]; delete r._ts; return r; });
  }

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
  function scopeQs(code) { return 'session_code=eq.' + encodeURIComponent(code); }

  var liveStore = {
    listParticipants: function (code) {
      return soft(rest('ws_participants?' + scopeQs(code) + '&order=joined_at.asc'), []);
    },
    /* 이름으로만 찾는다(날짜 무시) — 비밀번호 검증은 호출부(WSData.joinParticipant)에서 한다 */
    findParticipantByName: function (code, name) {
      return soft(rest('ws_participants?' + scopeQs(code) + '&name=eq.' + encodeURIComponent(name) + '&order=joined_at.asc&limit=1'), [])
        .then(function (rows) { return (rows || [])[0] || null; });
    },
    addParticipant: function (row) {
      return rest('ws_participants', { method: 'POST', body: [row], prefer: 'return=representation,resolution=merge-duplicates' })
        .then(function (rows) { return (rows || [])[0] || row; })
        .catch(function (e) { if (window.WS_DEBUG) console.warn(e); return row; });
    },
    getTeamInfo: function (code) {
      return soft(rest('ws_team_info?' + scopeQs(code) + '&order=team.asc'), [])
        .then(function (rows) { return dedupeLatest(rows, function (r) { return r.team; }); });
    },
    setTeamInfo: function (row) {
      return rest('ws_team_info?on_conflict=session_code,day,team', { method: 'POST', body: [row], prefer: 'resolution=merge-duplicates,return=minimal' })
        .then(function () { return true; }).catch(function (e) { if (window.WS_DEBUG) console.warn(e); return false; });
    },
    listResponses: function (code, questionId) {
      var q = 'ws_responses?' + scopeQs(code);
      if (questionId) {
        q += Object.prototype.toString.call(questionId) === '[object Array]'
          ? '&question_id=in.(' + questionId.map(encodeURIComponent).join(',') + ')'
          : '&question_id=eq.' + encodeURIComponent(questionId);
      }
      return soft(rest(q + '&order=updated_at.asc'), [])
        .then(function (rows) { return dedupeLatest(rows, function (r) { return r.participant_id + '::' + r.question_id; }); });
    },
    upsertResponses: function (rows) {
      if (!rows.length) return Promise.resolve(true);
      return rest('ws_responses?on_conflict=session_code,day,participant_id,question_id', { method: 'POST', body: rows, prefer: 'resolution=merge-duplicates,return=minimal' })
        .then(function () { return true; }).catch(function (e) { if (window.WS_DEBUG) console.warn(e); return false; });
    },
    getCoachPlans: function (code) {
      return soft(rest('ws_coach_plans?' + scopeQs(code)), [])
        .then(function (rows) { return dedupeLatest(rows, function (r) { return r.participant_id; }); });
    },
    setCoachPlan: function (row) {
      return rest('ws_coach_plans?on_conflict=session_code,day,participant_id', { method: 'POST', body: [row], prefer: 'resolution=merge-duplicates,return=minimal' })
        .then(function () { return true; }).catch(function (e) { if (window.WS_DEBUG) console.warn(e); return false; });
    },
    logLogin: function (row) {
      return rest('ws_instructor_log', { method: 'POST', body: [row], prefer: 'return=minimal' })
        .then(function () { return true; }).catch(function (e) { if (window.WS_DEBUG) console.warn(e); return false; });
    },
    /* 강사 '초기화' 버튼 — 이 차수코드의 데이터를 전부 지운다(날짜 구분 없음). 로그인 이력은 남긴다. */
    wipeSession: function (code) {
      var tables = ['ws_participants', 'ws_team_info', 'ws_responses', 'ws_coach_plans'];
      return Promise.all(tables.map(function (t) {
        return rest(t + '?' + scopeQs(code), { method: 'DELETE', prefer: 'return=minimal' })
          .then(function () { return true; }).catch(function (e) { if (window.WS_DEBUG) console.warn(e); return false; });
      })).then(function (r) { return r.every(Boolean); });
    },
  };

  /* ── LOCAL : localStorage + BroadcastChannel ─────────────── */
  /* 날짜로 나누지 않고 차수코드 하나당 버킷 하나. 같은 기기에서 1박 2일 이어지는 걸 그대로 재현한다. */
  var CH = null;
  try { CH = new BroadcastChannel('lgws_local'); } catch (e) {}
  if (CH) CH.onmessage = function () { emit(); };
  function lsKey(code, table) { return 'lgws/' + code + '/' + table; }
  function lsRead(code, table, dflt) { try { var raw = localStorage.getItem(lsKey(code, table)); return raw ? JSON.parse(raw) : dflt; } catch (e) { return dflt; } }
  function lsWrite(code, table, val) { try { localStorage.setItem(lsKey(code, table), JSON.stringify(val)); } catch (e) {} if (CH) { try { CH.postMessage(1); } catch (e) {} } emit(); return val; }

  var localStore = {
    listParticipants: function (code) { return Promise.resolve(lsRead(code, 'participants', [])); },
    findParticipantByName: function (code, name) {
      var rows = lsRead(code, 'participants', []);
      return Promise.resolve(rows.filter(function (p) { return p.name === name; })[0] || null);
    },
    addParticipant: function (row) {
      var rows = lsRead(row.session_code, 'participants', []);
      rows.push(row); lsWrite(row.session_code, 'participants', rows);
      return Promise.resolve(row);
    },
    getTeamInfo: function (code) {
      var rows = dedupeLatest(lsRead(code, 'teams', []), function (r) { return r.team; });
      return Promise.resolve(rows);
    },
    setTeamInfo: function (row) {
      var rows = lsRead(row.session_code, 'teams', []).filter(function (t) { return !(t.team === row.team && t.day === row.day); });
      rows.push(row); lsWrite(row.session_code, 'teams', rows);
      return Promise.resolve(true);
    },
    listResponses: function (code, questionId) {
      var rows = lsRead(code, 'responses', []);
      if (questionId) {
        var want = Object.prototype.toString.call(questionId) === '[object Array]' ? questionId : [questionId];
        rows = rows.filter(function (r) { return want.indexOf(r.question_id) >= 0; });
      }
      return Promise.resolve(dedupeLatest(rows, function (r) { return r.participant_id + '::' + r.question_id; }));
    },
    upsertResponses: function (rows) {
      if (!rows.length) return Promise.resolve(true);
      var code = rows[0].session_code;
      var cur = lsRead(code, 'responses', []);
      rows.forEach(function (n) {
        cur = cur.filter(function (r) { return !(r.participant_id === n.participant_id && r.question_id === n.question_id && r.day === n.day); });
        cur.push(n);
      });
      lsWrite(code, 'responses', cur);
      return Promise.resolve(true);
    },
    getCoachPlans: function (code) {
      return Promise.resolve(dedupeLatest(lsRead(code, 'coach', []), function (r) { return r.participant_id; }));
    },
    setCoachPlan: function (row) {
      var rows = lsRead(row.session_code, 'coach', []).filter(function (p) { return !(p.participant_id === row.participant_id && p.day === row.day); });
      rows.push(row); lsWrite(row.session_code, 'coach', rows);
      return Promise.resolve(true);
    },
    logLogin: function (row) {
      var rows = lsRead(row.session_code, 'login_log', []);
      rows.push(row); lsWrite(row.session_code, 'login_log', rows);
      return Promise.resolve(true);
    },
    wipeSession: function (code) {
      ['participants', 'teams', 'responses', 'coach'].forEach(function (k) { lsWrite(code, k, []); });
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
    /* 강사 초기화 버튼 — 이 차수코드의 데이터를 전부 지운다(1박 2일 전체). 되돌릴 수 없다. */
    resetSession: function (sessionCode) {
      var code = toSessionCode(sessionCode);
      if (!code) return Promise.resolve(false);
      return S.wipeSession(code);
    },
    getSession: function (sessionCode) {
      var code = toSessionCode(sessionCode);
      var label = ROUNDS[code];
      return Promise.resolve(label ? { session_code: code, round_label: label, day: today() } : null);
    },

    getParticipants: function (sessionCode) { return S.listParticipants(toSessionCode(sessionCode)); },
    /* 이름 + 비밀번호로 입장. 같은 이름+비밀번호면 기존 참가자(같은 participant_id)로 이어진다.
       이름은 있는데 비밀번호가 다르면 다른 사람일 수 있으므로 막고 재입력을 요청한다. */
    joinParticipant: function (sessionCode, name, password, team) {
      var code = toSessionCode(sessionCode), day = today(), n = String(name || '').trim(), pw = String(password || '').trim();
      return S.findParticipantByName(code, n).then(function (existing) {
        if (existing) {
          if (String(existing.password || '') !== pw) {
            return { ok: false, reason: 'PASSWORD_MISMATCH' };
          }
          return { ok: true, participant: existing, isNew: false };
        }
        if (!pw) return { ok: false, reason: 'PASSWORD_REQUIRED' };
        return S.addParticipant({
          participant_id: newId(), session_code: code, day: day, name: n, password: pw,
          team: team == null ? null : Number(team), joined_at: new Date().toISOString(),
        }).then(function (row) { return { ok: true, participant: row, isNew: true }; });
      });
    },

    getTeamInfoAll: function (sessionCode) { return S.getTeamInfo(toSessionCode(sessionCode)); },
    submitTeamInfo: function (sessionCode, team, info) {
      return S.setTeamInfo({ session_code: toSessionCode(sessionCode), day: today(), team: Number(team), name: info.name || '', slogan: info.slogan || '', rep: info.rep || '', updated_at: new Date().toISOString() });
    },

    getResponses: function (sessionCode, questionId) { return S.listResponses(toSessionCode(sessionCode), questionId).then(function (r) { return r || []; }); },
    submitResponses: function (sessionCode, participantId, answers) {
      var code = toSessionCode(sessionCode), day = today(), now = new Date().toISOString();
      var rows = (answers || []).filter(function (a) { return a && a.text != null && String(a.text).trim() !== ''; })
        .map(function (a) { return { session_code: code, day: day, participant_id: participantId, question_id: a.question_id, text: String(a.text).trim(), updated_at: now }; });
      return S.upsertResponses(rows);
    },

    getCoachPlans: function (sessionCode) { return S.getCoachPlans(toSessionCode(sessionCode)); },
    submitCoachPlan: function (sessionCode, participantId, plan) {
      return S.setCoachPlan({ session_code: toSessionCode(sessionCode), day: today(), participant_id: participantId, plan: plan, updated_at: new Date().toISOString() });
    },

    /* 진행 잠금(게이트) — "강사가 특정 화면까지 왔는지" 같은 차수 전체 상태를 공유한다.
       스키마 변경 없이 ws_responses를 재사용한다: participant_id="__system__",
       question_id="gate_"+key, text="open". ws_participants에 이 participant_id가
       없어서 참가자 관련 조회(JOIN)에는 섞이지 않는다. */
    openGate: function (sessionCode, gateKey) {
      return this.submitResponses(sessionCode, '__system__', [{ question_id: 'gate_' + gateKey, text: 'open' }]);
    },
    isGateOpen: function (sessionCode, gateKey) {
      return this.getResponses(sessionCode, 'gate_' + gateKey)
        .then(function (rows) { return (rows || []).some(function (r) { return r.participant_id === '__system__' && r.text === 'open'; }); });
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
