# 🚀 wemake 프로젝트

> Vite 기반 wemake 프로젝트트

## ✨ 주요 특징

- 🔥 **최신 기술 스택**: Vite, React 19, React Router v7
- 🎨 **현대적 UI**: Tailwind CSS v4 + shadcn/ui 디자인 시스템
  <!-- - 🛠️ **개발자 경험**: Turbopack, ESLint, Prettier, Husky -->
  <!-- - 📱 **반응형 디자인**: 모바일 우선 반응형 레이아웃 -->
- 🌙 **다크 모드**: 내장 다크/라이트 모드 지원
<!-- - 🔧 **자동화**: Git 훅을 통한 코드 품질 자동 검사 -->
- 📝 **타입 안정성**: 엄격한 TypeScript 설정

## 🛠️ 기술 스택

### **Frontend**

- **Framework**: Next.js 15.3.5 (App Router)
- **Library**: React 19.0.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

### **개발 도구**

- **Build Tool**: Turbopack (개발 서버)
- **Linting**: ESLint 9 + Next.js 규칙
- **Formatting**: Prettier 3.6.2
- **Git Hooks**: Husky 9.1.7 + lint-staged
- **Package Manager**: npm

### **유틸리티**

- **Class Management**: clsx, tailwind-merge
- **Component Variants**: class-variance-authority
- **Animations**: tw-animate-css

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

오류 해결이 필요한 목록 리스트

1. 제품 상세 페이지에서 미리 보기, 리뷰 보기 버튼의 navlink를 활용한 조건부 스타일 적용 시 버튼에 직접 적용되는 것이 아님 // 이를 해결할 수 있는 방법 찾아보기

2. 메인페이지 오늘의 토론 섹션 포스트카드 플리커 현상 해결하기

3. 답글 css 구조 고민해보기(전체 width를 2/3로 제한하니까 댓글이 길어질수록 크기가 줄어듦)
