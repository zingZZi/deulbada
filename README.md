# 들바다 농수산물 마켓 플랫폼

> 농수산물 판매 및 구매와 SNS 기능을 결합한 모바일 최적화 마켓 플랫폼

**[🚀 배포 사이트 바로가기](https://deulbada.netlify.app/)**

**테스트 계정**

- ID: `test@test.com`
- PW: `test1234!`

<br>

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [팀원 소개](#2-팀원-소개)
3. [프로젝트 기간](#3-프로젝트-기간)
4. [기술 스택 및 개발 환경](#4-기술-스택-및-개발-환경)
5. [코드 컨벤션](#5-코드-컨벤션)
6. [커밋 컨벤션](#6-커밋-컨벤션)
7. [Git-flow Strategy](#7-git-flow-strategy)
8. [폴더 구조](#8-폴더-구조)
9. [개발 역할 및 담당 업무](#9-개발-역할-및-담당-업무)
10. [구현 페이지](#10-구현-페이지)
11. [주요 화면 구성](#11-주요-화면-구성-figma)
12. [프로젝트 회고](#12-프로젝트-회고)

<br>

## 1. 프로젝트 개요

들바다는 농수산물 판매 및 구매와 SNS 기능을 결합한 모바일 사이즈 최적화 플랫폼입니다.

**타겟층**

- 농수산물 판매 및 구매에 관심 있는 사용자
- SNS를 통해 일상을 공유하고 소통하고자 하는 사용자

React 기반으로 3명의 프론트엔드 개발자와 2명의 백엔드 개발자가 협업하여 개발한 프로젝트입니다. 효율적인 협업을 위해 코드 컨벤션과 Git-flow 전략을 도입하여 체계적으로 진행했습니다.

**팀 1차 목표: 오픈 일정에 맞춘 안정적인 서비스 런칭**

<br>

## 2. 팀원 소개

| 이름       | 역할                    | 포지션                        |
| ---------- | ----------------------- | ----------------------------- |
| **주지은** | 팀장 & 개발자           | Frontend Developer            |
| **박다솜** | 개발자 & UI/UX 디자이너 | Frontend Developer & Designer |
| **김태훈** | 개발자                  | Frontend Developer            |

**팀 구성**

- Frontend 개발자 3명
- Backend 개발자 2명
- 총 5명으로 구성된 풀스택 개발팀

<br>

## 3. 프로젝트 기간

**2024년 7월 28일 ~ 8월 18일** (3주)

<br>

## 4. 기술 스택 및 개발 환경

### Frontend

- **React** - 컴포넌트 기반 UI 라이브러리
- **Styled Components** - CSS-in-JS 스타일링
- **Lucide** - 아이콘 라이브러리

<br>

## 5. 코드 컨벤션

### 디렉토리 구조

- 컴포넌트, 페이지, 훅, 유틸 등 목적에 따라 폴더 분리
- 파일명 및 폴더명은 **카멜케이스 (CamelCase)** 로 통일

```
/components/Button.jsx
/hooks/useAuth.js
/pages/HomePage.jsx
```

### 파일/컴포넌트 작성 규칙

- 하나의 컴포넌트는 하나의 디렉토리로 분리하고, 관련 파일은 해당 폴더에 함께 관리
- 파일 이름과 컴포넌트 이름 일치
- **화살표 함수 사용**

```jsx
const MyComponent = () => {
  return <div>...</div>;
};

export default MyComponent;
```

### 스타일 (styled-components)

- 스타일은 컴포넌트와 같은 폴더 내 작성
- 파일명: **컴포넌트명.style.js**
- 스타일 이름은 `Styled` 접두사 사용

```jsx
const StyledLogin = styled.section`
  /* styles */
`;
```

### 코드 스타일

- 세미콜론 사용 (`;`)
- JavaScript 코드는 작은 따옴표 (`'`) 사용
- JSX 값은 큰 따옴표 (`"`) 사용
- 불필요한 콘솔 로그는 커밋 전 제거

```jsx
<Route path="/login" element={<LoginLayout page={'login'} />} />
```

### 기타

- 주석은 필요한 곳에만 간결하게 작성
- 공통 변수는 `constants.js`, `theme.js` 등으로 분리
- 협업 시 PR 전 `eslint`/`prettier` 적용

<br>

## 6. 커밋 컨벤션

### 커밋 타입 정의

| 타입       | 설명                                                                |
| ---------- | ------------------------------------------------------------------- |
| `Add`      | 새로운 기능 추가                                                    |
| `Fix`      | 버그 수정 (단순 수정 제외)                                          |
| `Docs`     | 문서 수정                                                           |
| `Edit`     | 코드 포맷팅, 누락된 세미콜론 추가 등 기능 변경 없는 단순 style 수정 |
| `Refactor` | 리팩토링 (동작은 동일하되 코드 구조 개선 등)                        |
| `TestEdit` | 테스트 관련 코드 추가 및 삭제 등                                    |
| `Chore`    | 빌드 / 배포 / 환경설정 등 기능 외 작업                              |

### 커밋 메시지 예시

```
Add: 상품 상세 페이지 기능 추가
Fix: 로그인 시 에러 메시지 노출 오류 수정
Docs: README 배포 방법 설명 추가
Edit: 세미콜론 누락 수정 및 들여쓰기 정리
Refactor: 유저 인증 로직 리팩토링
TestEdit: 장바구니 기능 테스트 코드 추가
Chore: 리액트 프로젝트 구성
```

<br>

## 7. Git-flow Strategy

`main`과 `dev` 브랜치를 중심으로, 기능 및 페이지 단위로 `feature` 브랜치를 생성하여 작업하는 Git-flow 전략을 사용했습니다.

- 모든 코드는 **Pull Request**와 **동료 리뷰**를 한뒤 `dev` 브랜치에 병합
- 안정적인 배포를 위해 `main` 브랜치는 검증된 코드만 병합

<br>

## 8. 폴더 구조

```
📦src
┣ 📂api
┃ ┣ 📜api.js
┃ ┣ 📜authApi.js
┃ ┣ 📜loginApi.js
┃ ┣ 📜postApi.js
┃ ┣ 📜productApi.js
┃ ┣ 📜signupApi.js
┃ ┗ 📜userApi.js
┣ 📂assets
┃ ┗ 📂images
┣ 📂auth
┃ ┣ 📜authService.js
┃ ┣ 📜RequireAuth.jsx
┃ ┗ 📜tokenStore.js
┣ 📂components // JSX 컴포넌트와 해당 스타일이 함께 관리되는 재사용 가능한 컴포넌트들
┃ ┣ 📂actionSheet
┃ ┣ 📂badge
┃ ┣ 📂bottomNavBar
┃ ┣ 📂header
┃ ┣ 📂icon
┃ ┣ 📂loding
┃ ┣ 📂modalPopup
┃ ┣ 📂postContent
┃ ┣ 📂scrollTop
┃ ┗ 📂userInfo
┣ 📂context
┃ ┣ 📜LoadingContext.jsx
┃ ┣ 📜PageActionsContext.jsx
┃ ┣ 📜PopupContext.jsx
┃ ┗ 📜ThemeContext.jsx
┣ 📂hooks
┃ ┣ 📜useChatWS.js
┃ ┣ 📜useFeedActions.js
┃ ┣ 📜useHeaderAction.js
┃ ┣ 📜usePopupAction.js
┃ ┣ 📜useProfileRedirect.js
┃ ┗ 📜useScrollObserver.js
┣ 📂layout
┃ ┣ 📂commonLayout
┃ ┗ 📂loginLayout
┣ 📂pages
┃ ┣ 📂chatList
┃ ┣ 📂chatRoom
┃ ┣ 📂followers
┃ ┣ 📂followings
┃ ┣ 📂guide
┃ ┣ 📂home
┃ ┣ 📂joinMembership
┃ ┣ 📂joinProducer
┃ ┣ 📂login
┃ ┣ 📂loginEmail
┃ ┣ 📂myProfileEdit
┃ ┣ 📂notFound
┃ ┣ 📂postDetail
┃ ┣ 📂postUpload
┃ ┣ 📂product
┃ ┣ 📂profile
┃ ┣ 📂profileSettings
┃ ┗ 📂search
┣ 📂styles // JSX 없이 스타일만 독립적으로 관리되는 공통 스타일 파일들
┃ ┣ 📜Button.style.js
┃ ┣ 📜Common.style.js
┃ ┣ 📜Container.style.js
┃ ┣ 📜font.js
┃ ┣ 📜Globalstyle.style.js
┃ ┗ 📜theme.js
┣ 📜App.jsx
┗ 📜main.jsx
```

<br>

## 9. 개발 역할 및 담당 업무

### 👨‍💻 주지은 (팀장)

**핵심 담당 영역**

- 전체적인 프로젝트 구조 설계 및 아키텍처 설계
- 공통 컴포넌트 및 스타일 시스템 구축
- 팀 코드 리뷰 및 품질 관리

**개발 담당 기능**

- 📱 홈 피드 화면 및 무한 스크롤 구현
- 🔍 통합 검색 기능 (사용자 검색)
- 👤 프로필 페이지 (본인/타인 프로필 뷰)
- 👥 팔로워/팔로잉 관리 시스템

### 👩‍💻 박다솜

**핵심 담당 영역**

- UXUI 리디자인
- 사용자 인증 시스템 전반
- 회원 관리 및 프로필 설정 기능
- UI/UX 예외 상황 처리

**개발 담당 기능**

- 🔐 로그인/로그아웃 시스템 구현
- ✨ 회원가입 (일반 회원/생산자 회원)
- ⚙️ 프로필 설정 및 수정 기능
- 🚫 404 에러 페이지

### 👨‍💻 김태훈

**핵심 담당 영역**

- 실시간 통신 및 소셜 기능
- 콘텐츠 업로드 및 관리 시스템
- WebSocket 기반 채팅 구현

**개발 담당 기능**

- 💬 실시간 1:1 채팅 시스템
- 📸 이미지 업로드 및 게시글 작성
- 📝 게시글 상세 페이지 및 댓글 기능
- 🛒 상품 등록 (생산자 전용)

### 🏆 팀 협업 성과

- **코드 품질**: 일관된 코드 컨벤션으로 유지보수성 향상
- **효율적 분업**: 각자의 강점을 살린 역할 분담으로 개발 속도 향상
- **안정적 배포**: Git-flow 전략과 코드 리뷰를 통한 버그 최소화
- **사용자 중심**: 모바일 퍼스트 설계로 최적화된 사용자 경험 제공

<br>

## 10. 구현 페이지

### 회원가입 / 로그인

- 이메일을 통한 일반 회원 및 생산자 회원 가입

### 홈 피드

<div align="center">
  <img src="./docs/images/home.gif" width="200" alt="홈피드"/>
</div>

- 사용자 및 생산자들의 피드 게시글 확인 가능
- 농산물 / 수산물 카테고리별 상품 확인

### 프로필

- 상대방 프로필

- 사용자 본인의 프로필

### 검색

<div align="center">
  <img src="./docs/images/search.gif" width="200" alt="검색"/>
</div>

- 계정 검색 기능
- 검색어와 일치된 부분 하이라이팅 기능
- 검색결과 없을시 검색결과 없을때의 케이스 처리

### 상품 등록

- 생산자 전용 상품 업로드 기능
  ![상품 등록 데모](./docs/images/상품등록.gif)

### 스토리 등록

- 이미지 + 텍스트를 활용한 게시글 작성

### 채팅

- 사용자 간 1:1 실시간 메시지 전송 및 이미지 전송

> 💡 **주요 기능 시연 영상**
>
> 추후 프로젝트의 주요 기능들을 담은 시연 영상(MP4)을 추가할 예정입니다.

<br>

## 11. 주요 화면 구성 (Figma)

**[Figma 디자인 링크 바로가기](https://www.figma.com/design/D9Eh2A96gnPy84rSd2gdrR/-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8--SNS%EB%A7%88%EC%BC%93_%EB%93%A4%EB%B0%94%EB%8B%A4?node-id=0-1&p=f&t=02CuyfnnNSbCJOuI-0)**

모바일 최적화에 중점을 둔 직관적이고 사용자 친화적인 UI/UX 디자인을 적용했습니다.

<br>

## 12. 프로젝트 회고

### 성과

- **체계적인 협업**: 코드 컨벤션과 Git-flow 전략을 통해 효율적이고 안정적인 개발 프로세스 구축
- **모바일 최적화**: 사용자 경험을 고려한 반응형 디자인과 직관적인 UI 구현
- **기능적 완성도**: 농수산물 거래와 SNS 기능을 성공적으로 결합한 플랫폼 완성
- **팀워크**: 역할 분담을 통한 효과적인 협업으로 일정 내 프로젝트 완료

### 개선점

- **기능 확장성**: 더 많은 부가 기능들을 구현하지 못한 아쉬움 (알림 시스템, 결제 기능 등)
- **성능 최적화**: 이미지 로딩 및 데이터 캐싱 등 성능 개선 여지
- **사용자 경험**: 더욱 세밀한 UX 개선과 접근성 향상 필요
- **테스트 코드**: 안정성 향상을 위한 테스트 코드 작성 부족

앞으로 이러한 개선점들을 보완하여 더욱 완성도 높은 서비스로 발전시켜 나갈 계획입니다.

---

> 들바다와 함께 신선한 농수산물의 새로운 경험을 시작하세요!
