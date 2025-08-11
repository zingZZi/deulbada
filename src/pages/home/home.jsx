// components/Home/Home.jsx
import { useEffect, useState } from 'react';
import CategoryTab from './categoryTab/CategoryTab.jsx';
import * as Styled from './Home.style.js';
import theme from '../../styles/theme.js';
import ProductList from './productList/ProductList.jsx';
import PostList from './postList/PostList.jsx';
import { useTheme } from '../../context/ThemeContext';

const Home = () => {
  const [categorySelected, setCategorySelected] = useState('default');
  const [mainTitle, setMainTitle] = useState('');
  const [subCategory, setSubCategory] = useState(null);
  const { updateTheme, resetTheme } = useTheme();

  // 테마 업데이트 로직
  useEffect(() => {
    const customTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        primary:
          categorySelected === 'fishing' && subCategory !== null ? '#1B91EA' : theme.colors.primary,
      },
    };

    updateTheme(customTheme);
  }, [categorySelected, subCategory, updateTheme]);

  // 메인 타이틀 설정
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

  // 컴포넌트 언마운트 시 기본 테마로 복원
  useEffect(() => {
    return () => {
      resetTheme();
    };
  }, [resetTheme]);

  return (
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
        {categorySelected === 'default' ? <PostList /> : <ProductList subCategory={subCategory} />}
      </Styled.StyledContent>
    </Styled.StyledHome>
  );
};

export default Home;
