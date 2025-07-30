import * as Styled from './CategoryTab.style.js';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면
const sampleList = [
  '입채소류1',
  '열매채소류',
  '뿌리채소류 ',
  '입채소류4',
  '입채소류5',
  '입채소류6',
  '입채소류7',
  '입채소류8',
];
const sampleList2 = ['어업1', '어업2', '어업3', '어업4', '어업5', '어업6', '어업7', '어업8'];
const CategoryTab = ({ setCategorySelected, categorySelected, setSubCategory, subCategory }) => {
  console.log(subCategory);
  function categoryChange(e) {
    setCategorySelected(e.target.dataset.id);
  }
  function categorySelect(e) {
    setSubCategory(e);
  }
  return (
    <Styled.CategoryLayout>
      <h3 className="text-ir">카테고리 선택</h3>
      {/* depth1 선택영역 */}
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
        {categorySelected === 'agricultural' || categorySelected === 'default'
          ? sampleList.map((item, i) => (
              <li key={i} className={item === subCategory ? 'active' : null}>
                <Styled.CategorySubItem
                  onClick={() => {
                    categorySelect(item);
                  }}
                >
                  <img src={sampleImage} alt="샘플이미지" />
                </Styled.CategorySubItem>
                <Styled.CategorySubTitle>{item}</Styled.CategorySubTitle>
              </li>
            ))
          : sampleList2.map((item, i) => (
              <li key={i} className={item === subCategory ? 'active' : null}>
                <Styled.CategorySubItem
                  onClick={() => {
                    categorySelect(item);
                  }}
                >
                  <img src={sampleImage} alt="샘플이미지" />
                </Styled.CategorySubItem>
                <Styled.CategorySubTitle>{item}</Styled.CategorySubTitle>
              </li>
            ))}
      </Styled.CategorySubList>
    </Styled.CategoryLayout>
  );
};

export default CategoryTab;
