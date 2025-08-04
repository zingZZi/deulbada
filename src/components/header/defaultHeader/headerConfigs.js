export const defaultHeaderMap = {
  '/profile': {
    leftText: false,
    rightButton: {
      type: 'icon',
      text: '더보기',
      action: () => console.log('더보기'),
    },
  },
  '/profile/edit': {
    leftText: false,
    rightButton: {
      type: 'text',
      text: '수정',
      action: () => console.log('수정'),
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
  '/followers': {
    leftText: 'Followers',
    rightButton: false,
  },
};
