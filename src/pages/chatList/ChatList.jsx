import * as Styled from './ChatList.style.js';
import sampleImg from '../../assets/images/sample.png';


const ChatList = () => {

  const chatListData = [
  {
    id: 1,
    name: '애월읍 위니브 감귤농장',
    message: '이번에 정정 언제하맨마씸?',
    date: '2020.10.25',
    profileImg: sampleImg,
    isOnline: true,
  },
 {
    id: 2,
    name: '제주감귤마을',
    message: '깊은 어둠의 존재감, 롤스로이스 뉴 블랙배지가나다라마바사아자',
    date: '2020.10.25',
    profileImg: sampleImg,
    isOnline: true,
  },
  {
    id: 3,
    name: '누구네 농장 친환경 한라봉',
    message: '내 차는 내가 평가한다. 오픈 이벤트에 참여 하가나다라마바사아자',
    date: '2020.10.25',
    profileImg: sampleImg,
    isOnline: false,
  }
];

  return (
    <>
      <Styled.ChatList>
        {chatListData.map((user) => (
          <Styled.ChatItem key={user.id}>
            <Styled.ProfileWrapper>
              <Styled.ProfileImg src={user.profileImg} alt={user.name} />
              {user.isOnline && <Styled.OnlineDot />}
            </Styled.ProfileWrapper>

            <Styled.TextBox>
              <Styled.Name>{user.name}</Styled.Name>
              <Styled.LastMessage>{user.message}</Styled.LastMessage>
            </Styled.TextBox>

            <Styled.Date>{user.date}</Styled.Date>
          </Styled.ChatItem>
        ))} 
      </Styled.ChatList>
    </>
    
  );
  
};

export default ChatList;
