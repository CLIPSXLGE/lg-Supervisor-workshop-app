/* Supabase 접속 설정 — 두 값을 채우면 연동이 켜집니다.
   비어 있으면 앱은 localStorage 기반 "로컬 모드"로 동작합니다(같은 브라우저 안에서만 공유). */
window.WS_SUPABASE = {
  appBase: 'https://lg-supervisor-workshop-app.vercel.app/', // 실제 배포 주소로 교체
  url: 'https://ejfdphoyffsclijfnyes.supabase.co',
  anonKey: 'sb_publishable_nFeLe_QORA5OWroFZzueKQ_S9zVNpbv',
};

/* 차수별 접속코드. 비밀번호는 접속코드와 동일하게 둡니다(강사 로그인용). */
window.WS_ROUNDS = {
  '1111': '1차',
  '2222': '2차',
  '3333': '3차',
  '4444': '4차',
};
