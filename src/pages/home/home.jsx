import { useEffect, useState } from 'react';
import PostContent from '../../components/postContent/PostContent';
import UserInfo from '../../components/userInfo/UserInfo';
import CategoryTab from './CategoryTab';
import { StyledHome, StyledContent } from './Home.style';

const Home = () => {
  const [mainTitle, setMainTitle] = useState('');
  useEffect(() => {
    setMainTitle('최신피드영역입니다.');
  }, []);
  return (
    <>
      <StyledHome>
        <h2 className="text-ir">들바다 메인페이지</h2>
        <CategoryTab />
        <StyledContent>
          <h3 className="text-ir">{mainTitle}</h3>
          <ul>
            <li>
              <UserInfo as="div" />
              <PostContent />
            </li>
          </ul>
        </StyledContent>
      </StyledHome>
    </>
  );
};

export default Home;
