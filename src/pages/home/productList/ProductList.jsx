import { Link } from 'react-router-dom';
import * as Styled from './ProductList.style';
import { useEffect, useState } from 'react';
import { fetchProductFilter } from '../../../api/productApi';

const ProductList = ({ subCategory }) => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProductFilter(subCategory);
        setProductList(response.data.results);
      } catch (error) {
        console.error('Post를 불러오지 못했습니다.', error);
      }
    };
    getProduct();
  }, [subCategory]);
  console.log(productList);
  //console.log(subCategory);
  return (
    <Styled.ProductList>
      {productList.map((e) => {
        return (
          <Styled.ProductItem key={e.id}>
            <Link to="">
              <Styled.ImgWrap>
                <img src={e.image_urls} alt="" />
              </Styled.ImgWrap>
              <div>
                {e.is_seller_verified ? (
                  <Styled.ProductBadges>
                    <Styled.BadgeCertified>인증판매</Styled.BadgeCertified>
                    <Styled.BadgeDirect>산지직영</Styled.BadgeDirect>
                  </Styled.ProductBadges>
                ) : (
                  <Styled.ProductBadges>
                    <Styled.BadgeUncertified>일반판매</Styled.BadgeUncertified>
                    <Styled.BadgeDefault>입점 판매자</Styled.BadgeDefault>
                  </Styled.ProductBadges>
                )}

                <Styled.ProductTitle>{e.seller_username}</Styled.ProductTitle>
                <Styled.ProductDesc>{e.description}</Styled.ProductDesc>
                <Styled.ProductPrice>{e.price.toLocaleString('ko-KR')}원</Styled.ProductPrice>
              </div>
            </Link>
          </Styled.ProductItem>
        );
      })}
    </Styled.ProductList>
  );
};

export default ProductList;
