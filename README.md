# 🚀 wemake 클론 프로젝트

> nomad코더 강의 wemake 제작을 기반으로 프로젝트의 생성부터 배포까지 라이프사이클을 경험하고, 라이브러리와 함수 등을 배우고 익히는 프로젝트이다
> 개인적으로 더 공부하여 구현하고자 하는 내용들의 구현도 예정

## ✨ 주요 특징

- 🔥 **최신 기술 스택**: Vite, React 19, React Router v7
- 🎨 **현대적 UI**: Tailwind CSS v4 + shadcn/ui 디자인 시스템
- 🌙 **다크 모드**: 내장 다크/라이트 모드 지원
- 📝 **타입 안정성**: 엄격한 TypeScript 설정

## 🛠️ 기술 스택

- **Framework**: React Router 7.12.0
- **Library**: React 19.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

### **개발 도구**

- **Build Tool**: Turbopack (개발 서버)
- **Formatting**: Prettier 3.6.2
- **Package Manager**: npm

## 📁 프로젝트 구조

```
postify-client/
├── 📁 .github/              # GitHub 템플릿 및 워크플로우
│   ├── ISSUE_TEMPLATE/      # 이슈 템플릿 (bug, feature, docs 등)
│   └── pull_request_template.md
├── 📁 .husky/               # Git 훅 설정
│   ├── pre-commit           # 코드 품질 검사
│   └── commit-msg           # 커밋 메시지 검증
├── 📁 public/               # 정적 파일
│   ├── next.svg
│   ├── vercel.svg
│   └── ...
├── 📁 src/                  # 소스 코드
│   ├── 📁 app/              # Next.js App Router
│   │   ├── globals.css      # 전역 스타일
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   └── page.tsx         # 홈 페이지
│   └── 📁 lib/              # 유틸리티 함수
│       └── utils.ts         # 클래스 병합 유틸리티
├── 📄 components.json       # shadcn/ui 설정
├── 📄 tailwind.config.js    # Tailwind CSS 설정
├── 📄 tsconfig.json         # TypeScript 설정
└── 📄 package.json          # 프로젝트 의존성
```

## 🚀 시작하기

### **필수 요구사항**

- Vite 7.3 이상
- Tailwindcss 4.1 이상
- React-Router 7.0 이상

### **설치 및 실행**

```bash
# 저장소 클론
git clone https://github.com/genre0928/wemake.git
cd wemake-v2

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### **사용 가능한 스크립트**

```bash
# 개발 서버 실행 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 린팅
npm run lint

# Git 훅 설정
npm run prepare
```

## 🎨 디자인 시스템

### **shadcn/ui 설정**

- **스타일**: New York
- **컬러**: Neutral 베이스
- **CSS Variables**: 활성화
- **아이콘**: Lucide React

### **테마 시스템**

- **라이트 모드**: 깔끔한 화이트 기반 테마
- **다크 모드**: 모던한 다크 그레이 테마
- **반응형**: 모바일 우선 디자인

## 🔧 개발 환경 설정

### **코드 품질 관리**

프로젝트는 자동화된 코드 품질 관리 시스템을 사용합니다:

#### **Pre-commit 훅**

- **lint-staged**: 스테이징된 파일 검사
- **ESLint**: 코드 품질 검사 및 자동 수정
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 체크

#### **Commit 메시지 검증**

커밋 메시지는 다음 컨벤션을 따라야 합니다:

```
<type>: <description>
<type>(<scope>): <description>
<type>: <description> #<issue_number>
```

**사용 가능한 타입:**

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `chore`: 빌드/패키지 매니저
- `comment`: 주석 추가
- `design`: UI/UX 변경
- `remove`: 파일 삭제
- `rename`: 파일 이름 변경

**예시:**

```bash
feat: 사용자 로그인 기능 추가
fix(auth): 로그인 버그 수정 #123
docs: README 업데이트
```

## 📝 기여 가이드

### **이슈 생성**

GitHub Issues를 통해 다음 유형의 이슈를 생성할 수 있습니다:

- 🐛 **Bug Report**: 버그 신고
- 🚀 **Feature Request**: 새 기능 제안
- 📝 **Documentation**: 문서 개선
- ♻️ **Refactor**: 코드 리팩토링
- 💬 **General**: 일반 문의

Luxon - 날짜 라이브러리
zod - 입력 검증 라이브러리
Magic UI - 애니메이션 라이브러리
Supabase - BaaS(Backend as a Service)
Drizzle ORM - SQL을 사용자 언어로 작성하게 도와주는 라이브러리(타입안정성 향상)

Data 로딩 전략

1. 비동기
2. <await>
3. prefetch
4. clientLoader + HydrateFallback() 로딩 렌더링 요소 // loader()이랑 같이사용 가능해서 browse에서 필요한 데이터 따로 가져올 수 있음

prefetch props - 속성의 조건에 따라 이동하고자 하는 웹페이지의 렌더링을 미리 진행함
none - prefetch 미진행
intent - mouse hover 시
viewport - 사용자의 view에 요소가 진입할 때
render - 요소가 렌더링 될 때

오류 해결이 필요한 목록 리스트

1. 제품 상세 페이지에서 미리 보기, 리뷰 보기 버튼의 navlink를 활용한 조건부 스타일 적용 시 버튼에 직접 적용되는 것이 아님 // 이를 해결할 수 있는 방법 찾아보기

2. 메인페이지 오늘의 토론 섹션 포스트카드 플리커 현상 해결하기

3. 답글 css 구조 고민해보기(전체 width를 2/3로 제한하니까 댓글이 길어질수록 크기가 줄어듦)

sql view 생성 순서

1. 폴더에 sql 파일 생성 및 sql문 작성
2. supabase sql 에디터 실행
3. 생성한 view의 타입을 가져오기 위해 npm run db:typegen 실행

\*\* view 생성 시 nullable 타입 선정으로 오류 발생
supa-client.ts에서 null 미허용으로 타입 덮어씌우기 하면 해결

Row Level Security

1. postgreSQL 기능 - DB 보호가 가능함
2. Backend가 있는 경우 Authorization과 Authentication이 가능하지만 없는 경우 RLS를 통해 대체 가능하다(DB 접근 권한 등)
   Backend가 없는 경우(React Native app, Flutter App, SPA 등 << 이유 알아보기>>)

사용자 <> supabase 통신하는 경우와 action, loader 함수를 통해 통신하는 경우의 차이점 알아보기

settings에서 업로드한 이미지 나오게끔 수정

useFetcher()훅 공부하기 << 복수의 Form 사용 시 loading 상태를 분리하여 관리하기 위해서 사용함
(settings-page 코드 참고)

...rest 개념 알아두기, 나머지 속성을 모아서 하나의 객체로 만드는 REst Properties 문법

featcher

- url에 의존하지 않고 백엔드에 데이터 저장하기 위함
- url보단 컴포넌트에 의존적
- Form 컴포넌트 복수 사용하는 상황 및, 동일한 function을 페이지마다 구현하는 상황에 유용할 것 같음

fetcher을 통해 데이터 fetch하는 방법

1. const fetcher = useFetcher() react hook 사용
2. <fetcher.Form> 내에 input 생성 후 value값 전달

RLS 사용 시 policy 생성하는데 using 조건과 with check 조건이 있음 // 각 조건의 차이 공부하기
drizzle을 통해서 schema.ts에 pgTable 생성 시 두 번째 파라미터에 pgPolicy를 통해서도 설정 가능함
(supabase에서 하거나 drizzle을 통해서 RLS 설정하거나 두 가지 선택이 가능)

transactional email - 쿠폰을 보내거나 하는 등의 역할을 하는 이메일
loader이나 action에 데이터를 안보낼 것이므로 Form 컴포넌트가 아닌 form 태그를 사용한다함
-- Form 컴포넌트에 데이터 전달기능이 있나?

https://docs.tosspayments.com/guides/v2/payment-widget/integration / 토스페이먼츠 결제 docs
코드 챌린지

vercel을 통해 deploy 후 social 로그인이 필요한 경우 supabase에서 authentication - url configuragion에서 도메인 이름으로 변경해줘야함

cloudflare security 탭 WAF(Web Application Firewall)을 통해 규칙 설정 가능
ex)국적이 스페인인 경우 block, interactive 처리 등등

sentry.io를 통해 error report 처리할 수 있음 -- 이거는 나중에 해볼거라서 강의 안들음
1. post-page view 변경 등을 통해 upvotes와 isUpvoted 가져와서 event 적용해보기

