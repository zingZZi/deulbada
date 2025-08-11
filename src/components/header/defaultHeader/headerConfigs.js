// headerConfigs.js
export const defaultHeaderMap = (pathname) => {
  // 정확한 경로 매칭
  const exactMatch = {
    '/profile': {
      leftText: false,
      rightButton: {
        type: 'icon',
        text: '더보기',
        actionKey: 'openProfileMenu',
      },
    },
    '/profile/edit': {
      leftText: false,
      rightButton: {
        type: 'text',
        text: '저장',
        actionKey: 'saveProfile',
      },
    },
    '/post': {
      leftText: false,
      rightButton: {
        type: 'icon',
        text: '더보기',
        action: () => console.log('더보기'),
      },
    },
    '/myprofile': {
      leftText: false,
      rightButton: {
        type: 'icon',
        text: '더보기',
        actionKey: 'openProfileMenu',
      },
    },
  };

  // 정확히 일치하는 경로가 있으면 반환
  if (exactMatch[pathname]) {
    return exactMatch[pathname];
  }

  // 동적 경로 처리
  if (pathname.startsWith('/followers/')) {
    return {
      leftText: 'Followers',
      rightButton: false,
    };
  }

  if (pathname.startsWith('/followings/')) {
    return {
      leftText: 'Followings',
      rightButton: false,
    };
  }

  if (pathname.startsWith('/profile/') && pathname !== '/profile/edit') {
    return {
      leftText: false,
      rightButton: false,
    };
  }

  return {};
};
