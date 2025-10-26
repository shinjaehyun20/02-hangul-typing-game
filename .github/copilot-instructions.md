# Copilot Instructions for 02-한글-타이핑-게임

## 프로젝트 개요
- 한글 타이핑 게임 (웹 기반, ES6 모듈 구조)
- 주요 기능: 난이도별 단어 타이핑, 점수/정확도/등급 산출, 최고 기록 저장, 사운드 효과, 반응형 UI
- 주요 폴더: `web/src/` (JS 모듈), `web/data/` (단어 데이터), `web/assets/` (이미지/사운드)

## 아키텍처 및 구조
- SPA 구조, 라우터(`router.js`)로 화면 전환
- 화면별 모듈: `screens/` (Home, LevelSelect, Game, Result)
- 상태 관리: 라우터로 전달, 일부는 localStorage(`appStorage`)
- 사운드: `appSound`(window 전역)
- 등급/점수 계산: `utils/grade.js`

## 개발/운영 워크플로우
- 새 화면/기능 추가 시: `screens/`에 모듈 생성, 라우터에 등록
- 단어 데이터 추가/수정: `web/data/words.json` 편집
- UI/스타일: `web/style.css` 또는 각 컴포넌트 내 인라인 스타일
- 사운드/이미지: `web/assets/`에 파일 추가 후 JS에서 경로 지정
- 최고 기록/설정: localStorage 활용, `appStorage` 참고

## 코드 컨벤션
- ES6 클래스, export/import 사용
- 화면별로 `render()`, `afterRender()`, `destroy()` 메서드 구현
- 상태/이벤트는 각 화면 클래스 내부에서 관리
- DOM 조작은 `render()` 후 `attachEvents()`에서 이벤트 바인딩
- 한글 변수명/주석 허용, 가독성 우선

## 통합/테스트 포인트
- 새 화면/기능 추가 시 라우터 정상 동작 확인
- 단어 데이터 변경 시 게임 정상 동작 및 등급 산출 확인
- 사운드/이미지 리소스 경로 및 로딩 확인
- localStorage 저장/불러오기 정상 동작 확인

## AI Agent를 위한 추가 지침
- 화면/기능 추가 시 기존 구조(모듈, 라우터, 상태관리) 준수
- 등급/점수/정확도 계산은 `utils/grade.js` 참고, 중복 구현 금지
- localStorage 연동은 `appStorage` API 활용, 직접 접근 지양
- 사운드 효과는 `appSound` API 활용, 직접 오디오 객체 생성 지양
- UI/스타일은 기존 클래스/스타일 우선 활용, 필요시 최소한의 인라인 스타일만 추가
- 코드/주석은 한글 또는 영어 혼용 가능, 가독성/유지보수성 우선

## 금지/주의 사항
- 민감 정보(예: API 키, 개인정보) 코드에 직접 포함 금지
- 대용량 리소스(이미지, 사운드)는 git에 직접 커밋하지 말고 별도 관리
- 외부 라이브러리 추가 시 README 및 주석에 명시

---
이 파일은 AI 코딩 에이전트 및 협업 개발자를 위한 프로젝트별 가이드입니다. 변경 시 반드시 팀과 공유하세요.
