import {
  CategoryMainTabs,
  StyledCategoryTab,
  CategorySubList,
  CategorySubItem,
  CategoryMainItem,
  CategoryMainButton,
} from './CategoryTab.style';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면
const sampleList = [
  '입채소류',
  '입채소류',
  '입채소류',
  '입채소류',
  '입채소류',
  '입채소류',
  '입채소류',
  '입채소류',
];
const CategoryTab = ({ setCategorySelected, categorySelected }) => {
  function categoryChange(e) {
    setCategorySelected(e.target.dataset.id);
  }
  console.log(categorySelected);
  return (
    <StyledCategoryTab>
      <h3 className="text-ir">카테고리 선택</h3>
      {/* depth1 선택영역 */}
      <CategoryMainTabs>
        <CategoryMainItem>
          <CategoryMainButton
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
          </CategoryMainButton>
        </CategoryMainItem>
        <CategoryMainItem>
          <CategoryMainButton
            onClick={categoryChange}
            data-id="fishing"
            className={categorySelected === 'fishing' ? 'active' : null}
          >
            수산물
          </CategoryMainButton>
        </CategoryMainItem>
      </CategoryMainTabs>

      {/* depth2 선택영역 */}
      <CategorySubList>
        {categorySelected === 'agricultural' || categorySelected === 'default' ? (
          sampleList.map((e, i) => (
            <li key={i}>
              <CategorySubItem>
                <img src={sampleImage} alt="샘플이미지" />
              </CategorySubItem>
              <span>{e}</span>
            </li>
          ))
        ) : (
          <>어업</>
        )}
      </CategorySubList>
    </StyledCategoryTab>
  );
};

export default CategoryTab;
