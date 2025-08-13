import * as Styled from './CategoryTab.style.js';
import agricultural1 from './../../../assets/images/agricultural_1.svg';
import agricultural2 from './../../../assets/images/agricultural_2.svg';
import agricultural3 from './../../../assets/images/agricultural_3.svg';
import agricultural4 from './../../../assets/images/agricultural_4.svg';
import agricultural5 from './../../../assets/images/agricultural_5.svg';
import agricultural6 from './../../../assets/images/agricultural_6.svg';
import agricultural7 from './../../../assets/images/agricultural_7.svg';
import agricultural8 from './../../../assets/images/agricultural_8.svg';
import fishing1 from './../../../assets/images/fishing_1.svg';
import fishing2 from './../../../assets/images/fishing_2.svg';
import fishing3 from './../../../assets/images/fishing_3.svg';
import fishing4 from './../../../assets/images/fishing_4.svg';
import fishing5 from './../../../assets/images/fishing_5.svg';
import fishing6 from './../../../assets/images/fishing_6.svg';
import fishing7 from './../../../assets/images/fishing_7.svg';
import fishing8 from './../../../assets/images/fishing_8.svg';

// 통합된 데이터 구조
const category = [
  {
    type: 'agricultural',
    categories: [
      '잎채소류',
      '열매채소류',
      '뿌리채소류',
      '과일류',
      '곡류·잡곡',
      '버섯류',
      '견과류',
      '기타농산물',
    ],
    images: [
      agricultural1,
      agricultural2,
      agricultural3,
      agricultural4,
      agricultural5,
      agricultural6,
      agricultural7,
      agricultural8,
    ],
  },
  {
    type: 'fishing',
    categories: [
      '생선류',
      '갑각류',
      '조개류',
      '연체류',
      '건어물류',
      '젓갈류',
      '어패가공품',
      '기타수산물',
    ],
    images: [fishing1, fishing2, fishing3, fishing4, fishing5, fishing6, fishing7, fishing8],
  },
];

const CategoryTab = ({ setCategorySelected, categorySelected, setSubCategory, subCategory }) => {
  function categoryChange(e) {
    const clickedCategory = e.target.dataset.id;

    // 이미 활성화된 카테고리를 다시 클릭하면 default로 변경하고 서브카테고리도 초기화
    if (categorySelected === clickedCategory) {
      setCategorySelected('default');
      setSubCategory(null);
    } else {
      // 새로운 카테고리 선택 시 해당 카테고리의 첫 번째 서브카테고리 자동 선택
      setCategorySelected(clickedCategory);
      const selectedCategoryData = category.find((cat) => cat.type === clickedCategory);
      if (selectedCategoryData && selectedCategoryData.categories.length > 0) {
        setSubCategory(selectedCategoryData.categories[0]);
      }
    }
  }

  function categorySelect(e) {
    // default 상태에서 서브카테고리를 선택하면 해당 메인 카테고리도 활성화
    if (categorySelected === 'default') {
      setCategorySelected('agricultural');
    }
    setSubCategory(e);
  }

  // 현재 선택된 카테고리 데이터 찾기
  const getCurrentCategoryData = () => {
    // default 상태일 때는 agricultural(농산물)을 기본으로 표시
    const targetType = categorySelected === 'default' ? 'agricultural' : categorySelected;
    return category.find((cat) => cat.type === targetType);
  };

  return (
    <Styled.CategoryLayout>
      <h3 className="text-ir">카테고리 선택</h3>
      <Styled.CategoryMainTabs>
        <Styled.CategoryMainItem>
          <Styled.CategoryMainButton
            className={
              categorySelected === 'agricultural'
                ? 'active'
                : categorySelected === 'default'
                ? 'off'
                : null
            }
            onClick={categoryChange}
            data-id="agricultural"
          >
            농산물
          </Styled.CategoryMainButton>
        </Styled.CategoryMainItem>
        <Styled.CategoryMainItem>
          <Styled.CategoryMainButton
            onClick={categoryChange}
            data-id="fishing"
            className={categorySelected === 'fishing' ? 'active' : null}
          >
            수산물
          </Styled.CategoryMainButton>
        </Styled.CategoryMainItem>
      </Styled.CategoryMainTabs>

      {/* depth2 선택영역 */}
      <Styled.CategorySubList>
        {getCurrentCategoryData()?.categories?.map((item, i) => {
          const currentCategoryData = getCurrentCategoryData();
          return (
            <li key={i} className={item === subCategory ? 'active' : null}>
              <Styled.CategorySubItem
                onClick={() => {
                  categorySelect(item);
                }}
              >
                <img src={currentCategoryData?.images[i]} alt={`${item} 이미지`} />
              </Styled.CategorySubItem>
              <Styled.CategorySubTitle>{item}</Styled.CategorySubTitle>
            </li>
          );
        })}
      </Styled.CategorySubList>
    </Styled.CategoryLayout>
  );
};

export default CategoryTab;
