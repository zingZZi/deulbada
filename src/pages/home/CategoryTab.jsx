import {
  CategoryMainTabs,
  StyledCategoryTab,
  CategorySubList,
  CategorySubItem,
  CategoryMainItem,
  CategoryMainButton,
} from './CategoryTab.style';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면

const CategoryTab = () => {
  return (
    <StyledCategoryTab>
      <h3 className="text-ir">카테고리 선택</h3>
      {/* depth1 선택영역 */}
      <CategoryMainTabs>
        <CategoryMainItem>
          <CategoryMainButton className="active">농산물</CategoryMainButton>
        </CategoryMainItem>
        <CategoryMainItem>
          <CategoryMainButton>수산물</CategoryMainButton>
        </CategoryMainItem>
      </CategoryMainTabs>

      {/* depth2 선택영역 */}
      <CategorySubList>
        <li>
          <CategorySubItem>
            <img src={sampleImage} alt="샘플이미지" />
          </CategorySubItem>
          <span>입채소류</span>
        </li>
        <li>
          <CategorySubItem>
            <img src={sampleImage} alt="샘플이미지" />
          </CategorySubItem>
          <span>입채소류</span>
        </li>
        <li>
          <CategorySubItem>
            <img src={sampleImage} alt="샘플이미지" />
          </CategorySubItem>
          <span>입채소류</span>
        </li>
        <li>
          <CategorySubItem>
            <img src={sampleImage} alt="샘플이미지" />
          </CategorySubItem>
          <span>입채소류</span>
        </li>
        <li>
          <CategorySubItem>
            <img src={sampleImage} alt="샘플이미지" />
          </CategorySubItem>
          <span>입채소류</span>
        </li>
        <li>
          <CategorySubItem>
            <img src={sampleImage} alt="샘플이미지" />
          </CategorySubItem>
          <span>입채소류</span>
        </li>
        <li>
          <CategorySubItem>
            <img src={sampleImage} alt="샘플이미지" />
          </CategorySubItem>
          <span>입채소류</span>
        </li>
        <li>
          <CategorySubItem>
            <img src={sampleImage} alt="샘플이미지" />
          </CategorySubItem>
          <span>입채소류</span>
        </li>
      </CategorySubList>
    </StyledCategoryTab>
  );
};

export default CategoryTab;
