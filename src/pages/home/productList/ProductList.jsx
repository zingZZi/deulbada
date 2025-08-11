import * as Styled from './ProductList.style';
import { useEffect, useState } from 'react';
import { fetchProductFilter } from '../../../api/productApi';
import ProductItem from './ProductItem';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
import LoadingComponent from '../../../components/loding/Loding';

const ProductList = ({ subCategory }) => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [morepage, setMorepage] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isBottom = useScrollObserver();

  useEffect(() => {
    if (isBottom && !isLoading && morepage && !isInitialLoad && productList.length > 0) {
      const timer = setTimeout(() => {
        if (!isLoading && morepage) {
          setPage((prevPage) => prevPage + 1);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isBottom, isLoading, morepage, isInitialLoad, productList.length]);

  // 카테고리 변경 시 초기화
  useEffect(() => {
    setPage(1);
    setMorepage(true);
    setProductList([]);
    setIsInitialLoad(true);
  }, [subCategory]);

  //데이터 불러오기
  useEffect(() => {
    if (!subCategory) return;

    const getProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProductFilter(subCategory, page);
        const data = response.data.results || response.data;
        const nextPage = response.data.next;

        if (nextPage === null) {
          setMorepage(false);
        }

        if (page === 1) {
          setProductList(data || []);
          setIsInitialLoad(false);
        } else {
          setProductList((prevProductList) => [...prevProductList, ...(data || [])]);
        }
      } catch (error) {
        console.error('Post를 불러오지 못했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [subCategory, page]);

  return (
    <Styled.ProductListWrap>
      <Styled.ProductListTitle>
        지금 가장 <b>인기있는 상품!</b>
      </Styled.ProductListTitle>
      <Styled.ProductList>
        {productList.map((e, i) => {
          return <ProductItem data={e} key={i} />;
        })}
      </Styled.ProductList>

      {isLoading && (
        <div
          style={{
            minHeight: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingComponent
            size={80}
            text="데이터를 불러오는 중..."
            showWaves={true}
            showDots={true}
            waveColor="rgba(255, 107, 53, 0.4)"
          />
        </div>
      )}
    </Styled.ProductListWrap>
  );
};

export default ProductList;
