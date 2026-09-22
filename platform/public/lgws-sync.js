/* LGWS 공용 동기화 레이어 (모바일 앱·강사 슬라이드 공통)
 * 기존 localStorage("lgws-workshop-state") 형태 {roster, teams, bp, diag}를 그대로 유지하되
 * Supabase Realtime으로 기기 간 공유. 설정이 없으면 localStorage+BroadcastChannel로 폴백.
 * 사용: await LGWS.init({url, anonKey, code}); LGWS.push('team','3',{...}); LGWS.subscribe(state=>...)
 */
(function () {
  const LS = "lgws-workshop-state";
  const blank = () => ({ roster: [], teams: {}, bp: [], diag: {}, coach: {} });
  let sb = null, code = "", listeners = [], cache = blank(), bc = null;
  try { bc = new BroadcastChannel("lgws"); bc.onmessage = () => { loadLocal(); emit(); }; } catch (e) {}

  const emit = () => listeners.forEach(fn => { try { fn(cache); } catch (e) {} });
  function loadLocal() { try { cache = Object.assign(blank(), JSON.parse(localStorage.getItem(LS) || "{}")); } catch (e) {} }
  function saveLocal() { try { localStorage.setItem(LS, JSON.stringify(cache)); if (bc) bc.postMessage({ t: Date.now() }); } catch (e) {} }

  function upsertList(list, name, d) { const i = list.findIndex(r => r.name === name); if (i >= 0) list[i] = d; else list.push(d); }
  function apply(row) {
    const d = row.data || {};
    if (row.kind === "roster") upsertList(cache.roster, row.key, d);
    else if (row.kind === "bp") upsertList(cache.bp, row.key, d);
    else if (row.kind === "team") cache.teams[row.key] = d;
    else if (row.kind === "diag") cache.diag[row.key] = d;
    else if (row.kind === "coach") cache.coach[row.key] = d;
  }

  window.LGWS = {
    async init(cfg) {
      code = cfg.code || "";
      loadLocal();
      if (!cfg.url || !cfg.anonKey || !window.supabase) { emit(); return false; }
      sb = window.supabase.createClient(cfg.url, cfg.anonKey);
      const { data } = await sb.from("entries").select("*").eq("session_code", code);
      cache = blank();
      (data || []).forEach(apply); saveLocal(); emit();
      sb.channel("entries-" + code)
        .on("postgres_changes", { event: "*", schema: "public", table: "entries", filter: "session_code=eq." + code },
          p => { if (p.new && p.new.kind) { apply(p.new); saveLocal(); emit(); } })
        .subscribe();
      return true;
    },
    async push(kind, key, data) {
      apply({ kind, key: String(key), data }); saveLocal(); emit();
      if (sb) await sb.from("entries").upsert({ session_code: code, kind, key: String(key), data }, { onConflict: "session_code,kind,key" });
    },
    subscribe(fn) { listeners.push(fn); fn(cache); return () => { listeners = listeners.filter(x => x !== fn); }; },
    state: () => cache,
  };
})();
