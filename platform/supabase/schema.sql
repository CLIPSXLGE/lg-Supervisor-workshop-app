-- 반장 리더십 RACE 워크숍: 교육생 모바일 -> 강사 슬라이드 실시간 연동
-- Supabase SQL Editor에 그대로 실행

create table if not exists public.entries (
  session_code text not null,            -- 강사가 안내하는 4자리 입장코드
  kind         text not null check (kind in ('roster','team','diag','bp','coach')),
  key          text not null,            -- roster/diag/bp/coach: 참가자 이름, team: 조 번호
  data         jsonb not null default '{}'::jsonb,
  updated_at   timestamptz not null default now(),
  primary key (session_code, kind, key)
);

create index if not exists entries_session_idx on public.entries (session_code);

create or replace function public.touch_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;

drop trigger if exists entries_touch on public.entries;
create trigger entries_touch before update on public.entries
  for each row execute function public.touch_updated_at();

-- 실시간 구독 활성화
alter publication supabase_realtime add table public.entries;

-- RLS: 단기 워크숍용. 익명 읽기/쓰기 허용(삭제 불가). 입장코드가 사실상 방 이름 역할.
-- 개인정보(실명·평가)는 저장하지 않는 것을 원칙으로 함(PRD: 이니셜/별칭).
alter table public.entries enable row level security;
create policy "anon read"   on public.entries for select using (true);
create policy "anon insert" on public.entries for insert with check (true);
create policy "anon update" on public.entries for update using (true) with check (true);
-- 워크숍 종료 후 정리(SQL Editor에서): delete from public.entries where session_code = '1234';
