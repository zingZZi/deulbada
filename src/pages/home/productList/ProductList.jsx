import { Link } from 'react-router-dom';
import sampleImage from './../../../assets/images/sample.png';
import * as Styled from './ProductList.style';
import { useEffect, useState } from 'react';
import { fetchProduct } from '../../../api/productApi';

const ProductList = ({ subCategory }) => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProduct();
        setPostList(response.data);
      } catch (error) {
        console.error('Post를 불러오지 못했습니다.', error);
      }
    };
    getProduct();
  }, []);
  console.log(postList);
  console.log(subCategory);
  return (
    <Styled.ProductList>
      {postList.map((e) => {
        return (
          <Styled.ProductItem key={e.id}>
            <Link to="">
              <Styled.ImgWrap>
                <img src={sampleImage} alt="" />
              </Styled.ImgWrap>
              <div>
                <Styled.ProductBadges>
                  <Styled.BadgeCertified>인증판매</Styled.BadgeCertified>
                  <Styled.BadgeDirect>산지직영</Styled.BadgeDirect>
                </Styled.ProductBadges>
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
