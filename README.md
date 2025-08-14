# 들바다 🌱

> 로컬 생산자와 소비자를 연결하는 **SNS 커머스 플랫폼**

<br>

## 🔍 프로젝트 소개

‘들바다’는 농산물·수산물을 생산하는 소규모 생산자들이  
자신의 상품을 직접 소개하고, 소비자와 소통하며 판매할 수 있는 **SNS 기반의 모바일 커머스 서비스**입니다.  
생산자들은 스토리(피드) 기능을 통해 상품을 홍보하고,  
소비자는 관심 있는 생산자와 채팅으로 직접 소통하거나 상품을 탐색해 구매할 수 있습니다.

<br>

## ⏰ 프로젝트 기간

- 2025.00.00 ~ 2025.00.00

<br>

## 👨‍👩‍👧‍👦 팀 소개

| 이름   | 역할              | 담당 기능 구역                |
| ------ | ----------------- | ----------------------------- |
| 주지은 | 팀장 / 프론트엔드 | 홈, 프로필, 검색, 스토리 상세 |
| 박다솜 | 팀원 / 프론트엔드 | 로그인, 회원가입, 제품 등록   |
| 김태훈 | 팀원 / 프론트엔드 | 채팅, 스토리 작성/등록        |

<br>

## 🛠 기술 스택

| 분야      | 기술                                                                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design    | Figma                                                                                                                                                |
| Frontend  | React, Styled-components                                                                                                                             |
| 사용 사유 | **Styled-components**는 컴포넌트 기반 구조에서 **CSS 충돌을 최소화**하고, **협업 시 스타일 격리 및 유지보수의 효율성**을 높이기 위해 도입하였습니다. |
| Backend   | (작성 예정)                                                                                                                                          |
| 기타      | (작성 예정)                                                                                                                                          |

<br>

## 📱 주요 기능

- **회원가입 / 로그인**
  - 이메일을 통한 일반 회원 및 생산자 회원 가입
- **홈 피드**
  - 사용자 및 생산자들의 피드 게시글 확인 가능
  - 농산물 / 수산물 카테고리별 상품 확인
- **프로필**
  - 사용자 본인의 피드, 판매 상품 목록 확인
- **상품 등록**
  - 생산자 전용 상품 업로드 기능
- **스토리 등록**
  - 이미지 + 텍스트를 활용한 게시글 작성
- **검색**
  - 사용자 및 생산자 계정 검색 기능
- **채팅**
  - 사용자 간 1:1 실시간 메시지 전송 및 이미지 전송

<br>

## 📸 주요 화면 구성 (Figma)

> [🎨 Figma 디자인 링크 바로가기](https://www.figma.com/design/D9Eh2A96gnPy84rSd2gdrR/-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8--SNS%EB%A7%88%EC%BC%93_%EB%93%A4%EB%B0%94%EB%8B%A4?node-id=0-1&p=f&t=3Hb9i4nlpGeQHy3p-0)

- Splash / 로그인 / 회원가입
- 홈 / 카테고리 / 검색
- 프로필 / 상품 등록 / 피드 상세
- 게시글 업로드 / 댓글
- 채팅 리스트 / 채팅방

<br>

## 📂 프로젝트 폴더 구조

src/
├── api/
│ ├── api.js
│ ├── authApi.js
│ ├── loginApi.js
│ ├── postApi.js
│ ├── productApi.js
│ ├── signupApi.js
│ └── userApi.js
├── assets/
│ └── images/
├── auth/
│ ├── authService.js
│ ├── RequireAuth.jsx
│ └── tokenStore.js
├── components/
│ ├── actionSheet/
│ ├── badge/
│ ├── bottomNavBar/
│ ├── header/
│ ├── icon/
│ ├── loding/
│ ├── modalPopup/
│ ├── postContent/
│ ├── scrollTop/
│ └── userInfo/
├── context/
│ ├── LoadingContext.jsx
│ ├── PageActionsContext.jsx
│ ├── PopupContext.jsx
│ └── ThemeContext.jsx
├── hooks/
│ ├── useChatWS.js
│ ├── useFeedActions.js
│ ├── useHeaderAction.js
│ ├── usePopupAction.js
│ ├── useProfileRedirect.js
│ └── useScrollObserver.js
├── layout/
│ ├── commonLayout/
│ └── loginLayout/
├── pages/
│ ├── chatList/
│ ├── chatRoom/
│ ├── followers/
│ ├── followings/
│ ├── guide/
│ ├── home/
│ ├── join-membership/
│ ├── join-producer/
│ ├── login/
│ ├── login-email/
│ ├── myProfileEdit/
│ ├── notFound/
│ ├── postDetail/
│ ├── postUpload/
│ ├── product/
│ ├── profile/
│ ├── profile-settings/
│ └── search/
├── styles/
├── App.jsx
└── main.jsx

## 🔗 API 명세

프로젝트 내에서 주로 사용하는 API 함수들의 간략한 목록입니다.

### 게시물(Post)

- `fetchPosts(page, limit)`  
  전체 게시물 조회 (기본: page=1, limit=4)
- `createPost(postData)`  
  게시물 작성
- `getPostDetail(id)`  
  게시물 상세 조회
- `getUserPost(userId, page, limit)`  
  특정 유저 게시물 목록 조회
- `delePost(postId)`  
  게시물 삭제
- `togglePostLike(id)`  
  게시물 좋아요 토글
- `getComments(postId)`  
  댓글 목록 조회
- `createComment(postId, commentData)`  
  댓글 작성
- `deleteComment(commentId)`  
  댓글 삭제
- `reportComment(commentId, reason)`  
  댓글 신고 (신고 이유 포함)

### 상품(Product)

- `fetchProduct()`  
  전체 상품 조회
- `fetchProductFilter(category, page, limit)`  
  카테고리별 상품 조회
- `getProductUser(user_name)`  
  특정 유저 상품 조회
- `createPost(productData)`  
  상품 등록

### 유저(User)

- `fetchUser(accountId)`  
  유저 정보 조회
- `SearchUser(searchString)`  
  유저 검색
- `fetchFollowers(accountId)`  
  팔로워 목록 조회
- `fetchFollowing(accountId)`  
  팔로잉 목록 조회
- `toggleFollow(accountId)`  
  팔로우 토글
- `editProfile(formData)`  
  프로필 수정 (multipart/form-data 사용)
- `checkAccountId(accountId)`  
  계정 아이디 중복 체크
