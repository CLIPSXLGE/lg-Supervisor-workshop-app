-- ══════════════════════════════════════════════════════════════
--  반장 리더십 RACE 워크숍 웹앱 DB (LG_SM_workshop 구조 참고)
--  Supabase → SQL Editor → New query 에 통째로 붙여넣고 Run.
--  여러 번 실행해도 안전합니다.
--
--  기준값 = session_code(차수코드: 1111/2222/3333/4444) + day(날짜)
-- ══════════════════════════════════════════════════════════════

create table if not exists ws_participants (
  participant_id text primary key,
  session_code   text        not null,
  day            date        not null,
  name           text        not null,
  team           int,
  joined_at      timestamptz not null default now()
);
create index if not exists ws_participants_scope on ws_participants (session_code, day, joined_at);
create index if not exists ws_participants_lookup on ws_participants (session_code, day, name, team);

-- 팀 이름·구호 (조별, 1건)
create table if not exists ws_team_info (
  session_code text not null,
  day          date not null,
  team         int  not null,
  name         text,
  slogan       text,
  rep          text,
  updated_at   timestamptz not null default now(),
  primary key (session_code, day, team)
);

-- 자가진단 20문항 · 아침 조회 · (그 외 텍스트 응답 전부) — question_id로 구분
create table if not exists ws_responses (
  id             bigserial primary key,
  session_code   text        not null,
  day            date        not null,
  participant_id text        not null,
  question_id    text        not null,
  text           text,
  updated_at     timestamptz not null default now(),
  unique (session_code, day, participant_id, question_id)
);
create index if not exists ws_responses_scope on ws_responses (session_code, day, question_id, updated_at);

-- AI 리더십 코치 플랜 (참가자당 1건, JSON 통째로 저장)
create table if not exists ws_coach_plans (
  session_code   text not null,
  day            date not null,
  participant_id text not null,
  plan           jsonb not null,
  updated_at     timestamptz not null default now(),
  primary key (session_code, day, participant_id)
);

create table if not exists ws_instructor_log (
  id              bigserial primary key,
  session_code    text not null,
  day             date not null,
  instructor_name text,
  login_time      timestamptz not null default now()
);

-- ── RLS ──────────────────────────────────────────────────────
-- 로그인 없이 anon 키로 동작 (워크숍 당일 짧게 쓰는 용도).
-- 워크숍 종료 후에는 정리 쿼리로 지우는 것을 권장합니다.
alter table ws_participants   enable row level security;
alter table ws_team_info      enable row level security;
alter table ws_responses      enable row level security;
alter table ws_coach_plans    enable row level security;
alter table ws_instructor_log enable row level security;

do $$
declare
  t text;
  rw text[] := array['ws_participants','ws_team_info','ws_responses','ws_coach_plans','ws_instructor_log'];
begin
  foreach t in array rw loop
    execute format('drop policy if exists ws_read   on %I', t);
    execute format('drop policy if exists ws_insert on %I', t);
    execute format('drop policy if exists ws_update on %I', t);
    execute format('create policy ws_read   on %I for select using (true)', t);
    execute format('create policy ws_insert on %I for insert with check (true)', t);
    execute format('create policy ws_update on %I for update using (true) with check (true)', t);
  end loop;
end $$;

-- 워크숍 종료 후 특정 차수 정리 (필요할 때 수동 실행):
-- delete from ws_participants   where session_code = '1111';
-- delete from ws_team_info      where session_code = '1111';
-- delete from ws_responses      where session_code = '1111';
-- delete from ws_coach_plans    where session_code = '1111';
