import { useEffect, useState } from 'react';
import PostContent from '../../components/postContent/PostContent';
import UserInfo from '../../components/userInfo/UserInfo';
import CategoryTab from './CategoryTab';
import { StyledHome, StyledContent } from './Home.style';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const Home = () => {
  const [categorySelected, setCategorySelected] = useState('default');
  const [mainTitle, setMainTitle] = useState('');

  //primary 컬러변경건
  const customTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      primary: categorySelected === 'fishing' ? '#1B91EA' : theme.colors.primary,
    },
  };

  useEffect(() => {
    switch (categorySelected) {
      case 'agricultural':
        setMainTitle('추천 농산물 리스트 영역입니다.');
        break;
      case 'fishing':
        setMainTitle('추천 수산물 리스트 영역입니다.');
        break;
      default:
        setMainTitle('최신피드영역입니다.');
    }
  }, [categorySelected]);
  return (
    <ThemeProvider theme={customTheme}>
      <StyledHome>
        <h2 className="text-ir">들바다 메인페이지</h2>
        <CategoryTab
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
        />
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
    </ThemeProvider>
  );
};

export default Home;
