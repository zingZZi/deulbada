# 들바다

# 전역 팝업 시스템

React Context API를 활용한 통합 팝업 관리 시스템입니다.

## ✨ 주요 기능

- 🎯 **전역 팝업 관리**: 모든 팝업이 한 곳에서 렌더링
- 🔄 **이중 Context**: 비즈니스 로직과 UI 상태 분리
- 🎨 **일관된 디자인**: ActionSheet + Modal 통합
- 🚀 **간편한 사용**: 액션 호출만으로 팝업 생성

## 🏗️ 아키텍처

```
PageActionsContext (비즈니스 로직) + PopupContext (UI 상태) → CommonLayout (통합 렌더링)
```

## 🚀 빠른 시작

### 1. 기본 팝업

```javascript
import { usePopup } from '../context/PopupContext';

const { openPopup } = usePopup();

openPopup({
  list: [
    { label: '수정', action: () => console.log('수정') },
    { label: '삭제', action: () => console.log('삭제') },
  ],
});
```

### 2. 팝업 → 모달 연결

```javascript
const { openPopup, closePopup, openModal, closeModal } = usePopup();

openPopup({
  list: [
    {
      label: '삭제',
      action: () => {
        closePopup();
        openModal({
          text: '정말 삭제하시겠습니까?',
          modalList: [
            { text: '취소', action: () => closeModal() },
            { text: '삭제', action: () => handleDelete() },
          ],
        });
      },
    },
  ],
});
```

### 3. 전용 액션 훅

```javascript
// hooks/useFeedActions.js
const useFeedActions = () => {
  const { openPopup } = usePopup();

  const handleFeedAction = (actionKey, data) => {
    switch (actionKey) {
      case 'openMenu':
        openPopup({
          list: [
            { label: '수정', action: () => editFeed(data) },
            { label: '삭제', action: () => deleteFeed(data) },
          ],
        });
    }
  };

  return { handleFeedAction };
};

// 컴포넌트에서
const { handleFeedAction } = useFeedActions();
<button onClick={() => handleFeedAction('openMenu', feedData)}>더보기</button>;
```

## 📁 파일 구조

```
src/
├── context/
│   ├── PageActionsContext.jsx    # 기존: 페이지 액션 관리
│   └── PopupContext.jsx         # 새로운: 팝업 UI 관리
├── hooks/
│   ├── useHeaderAction.js       # 헤더 액션
│   └── useActions.js          # 각 영역별 액션 훅
└── layouts/
    └── CommonLayout2.jsx        # 전역 팝업 렌더링
```

## 🔧 새 액션 추가

1. **전용 훅 생성** (선택사항)
2. **컴포넌트에서 `usePopup()` 직접 사용** 또는 **전용 훅 사용**
3. **팝업 UI는 자동으로 `CommonLayout`에서 렌더링**

## 🎯 장점

- ✅ **중복 제거**: 각 컴포넌트에서 팝업 UI 코드 불필요
- ✅ **일관성**: 모든 팝업이 동일한 디자인
- ✅ **확장성**: 새로운 액션 쉽게 추가
- ✅ **타입 안전**: TypeScript 적용 시 타입 체크 가능

## 📖 자세한 사용법

[전역 팝업 시스템 사용 가이드](./docs/popup-system-guide.md) 참고
