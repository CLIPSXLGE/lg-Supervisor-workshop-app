# 반장 워크숍 플랫폼 (강사 슬라이드 · 교육생 모바일 · AI 코치)

GitHub(코드) → Vercel(배포 + `/api/coach`) / Supabase(실시간 DB)

```
교육생 모바일 ──push──▶ Supabase(entries) ──realtime──▶ 강사 슬라이드
        └── 마지막 챕터: AI 코치 ──▶ /api/coach (Vercel) ──▶ Claude API
```

## 셋업 순서
1. Supabase 프로젝트 생성 → SQL Editor에서 `supabase/schema.sql` 실행
2. `public/config.example.js` → `public/config.js` 복사 후 URL·anon key 입력
3. GitHub에 push → Vercel에서 import (Root Directory를 이 `platform` 폴더로)
4. Vercel 환경변수 `ANTHROPIC_API_KEY` 등록 (선택: `COACH_MODEL`)

## 데이터 계약 (entries 테이블)
| kind | key | data |
|---|---|---|
| roster | 이름 | {code,name,teamNo,teamName} |
| team | 조 번호 | {name,slogan,rep} |
| diag | 이름 | {total,count,team} |
| bp | 이름 | {name,team,teamNo,when,how,best} |
| coach | 이름 | AI 코치 결과(리더십 플랜 v1.0) |

`public/lgws-sync.js`가 기존 localStorage 형태 `{roster,teams,bp,diag}`를 유지하므로
슬라이드의 `_live` 로직은 거의 그대로 재사용할 수 있습니다.

## 다음 작업
- [ ] 모바일 v2의 `_push`를 `LGWS.push`로 전환
- [ ] 슬라이드 `_live`를 `LGWS.subscribe`로 교체
- [ ] 모바일 마지막 챕터 "AI 코치" 삽입 (PRD Screen 0~13, 유형 판정은 규칙 기반)
- [ ] 강사 입장코드 설정 화면
