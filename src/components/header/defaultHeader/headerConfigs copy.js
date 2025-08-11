export const defaultHeaderMap = {
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
  '/followers/:user_name': {
    leftText: 'Followers',
    rightButton: false,
  },
  '/followings/:user_name': {
    leftText: 'Followings',
    rightButton: false,
  },
  '/myProfile': {
    leftText: false,
    rightButton: {
      type: 'text',
      text: '저장',
      actionKey: 'saveProfile',
    },
  },
};
