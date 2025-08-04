import { useEffect, useState } from 'react';
import UserInfo from '../../components/userInfo/UserInfo';
import CategoryTab from './CategoryTab';
import * as Styled from './Home.style.js';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import ProductList from './ProductList.jsx';
import PostContent from '../../components/PostContent/PostContent.jsx';

const Home = () => {
  const [categorySelected, setCategorySelected] = useState('default');
  const [mainTitle, setMainTitle] = useState('');
  const [subCategory, setSubCategory] = useState(null);

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
      <Styled.StyledHome>
        <h2 className="text-ir">들바다 메인페이지</h2>
        <CategoryTab
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
        />
        <Styled.StyledContent>
          <h3 className="text-ir">{mainTitle}</h3>

          {/* 일반피드영역 */}
          <ul>
            <Styled.StyledContentList>
              <UserInfo username="username" accountId="account_id" />
              <PostContent />
            </Styled.StyledContentList>
          </ul>

          {/* 상품리스트 */}
          <Styled.ProductListWrap>
            <Styled.ProductListTitle>
              지금 가장 <b>인기있는 상품!</b>
            </Styled.ProductListTitle>
            <ProductList />
          </Styled.ProductListWrap>
        </Styled.StyledContent>
      </Styled.StyledHome>
    </ThemeProvider>
  );
};

export default Home;
