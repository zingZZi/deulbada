import * as Styled from './CategoryTab.style.js';
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
const sampleList2 = ['어업1', '어업3', '어업1', '어업1', '어업1', '어업1', '어업1', '어업8'];
const CategoryTab = ({ setCategorySelected, categorySelected }) => {
  function categoryChange(e) {
    setCategorySelected(e.target.dataset.id);
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
          ? sampleList.map((e, i) => (
              <li key={i}>
                <Styled.CategorySubItem>
                  <img src={sampleImage} alt="샘플이미지" />
                </Styled.CategorySubItem>
                <Styled.CategorySubTitle>{e}</Styled.CategorySubTitle>
              </li>
            ))
          : sampleList2.map((e, i) => (
              <li key={i}>
                <Styled.CategorySubItem>
                  <img src={sampleImage} alt="샘플이미지" />
                </Styled.CategorySubItem>
                <Styled.CategorySubTitle>{e}</Styled.CategorySubTitle>
              </li>
            ))}
      </Styled.CategorySubList>
    </Styled.CategoryLayout>
  );
};

export default CategoryTab;
