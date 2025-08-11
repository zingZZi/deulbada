import React, { useState } from 'react';
import * as Styled from './PostContent.style';
import { HeartIcon, MessageCircleIcon } from '../../components/icon/Icon.style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import { togglePostLike } from '../../api/postApi';

const PostContent = ({ images, contet, date, id, isLiked = false }) => {
  // 좋아요 상태 관리
  //const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [currentLikeCount, setCurrentLikeCount] = useState(0);
  const [liked, setLiked] = useState(isLiked);
  const [isLoading, setIsLoading] = useState(false);

  const dateChange = new Date(date);
  const koreaTime = dateChange.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 좋아요 핸들러 함수 수정
  const likeHandler = async () => {
    if (isLoading) return;

    setIsLoading(true);
    console.log('좋아요 API 호출 시작:', id); // 추가

    try {
      const newLiked = !liked;
      setLiked(newLiked);
      setCurrentLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));

      // API 호출 결과 로그
      const result = await togglePostLike(id);
      console.log('API 응답:', result); // 추가
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
      // 롤백 로직...
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled.PostContentLayout>
      <h3 className="text-ir">포스트컨텐츠 내용입니다</h3>
      <p>{contet}</p>

      {images && images.length === 1 && (
        <Styled.ImgBoxWrap>
          <img src={images[0]} alt="업로드이미지" />
        </Styled.ImgBoxWrap>
      )}

      {images && images.length > 1 && (
        <Styled.CustomSwiper pagination={true} modules={[Pagination]}>
          {images.map((e, i) => (
            <Styled.CustomSwiperItem key={i}>
              <img src={e} alt="업로드이미지" />
            </Styled.CustomSwiperItem>
          ))}
        </Styled.CustomSwiper>
      )}

      <Styled.PostActions>
        <Styled.PostLikeButton onClick={likeHandler} disabled={isLoading}>
          <HeartIcon $liked={liked} />
          <Styled.Count>{currentLikeCount}</Styled.Count>
        </Styled.PostLikeButton>
        <Styled.CommnetButton to={`/post/${id}`}>
          <MessageCircleIcon />
          <Styled.Count>10</Styled.Count>
        </Styled.CommnetButton>
      </Styled.PostActions>
      <Styled.PostData>{koreaTime}</Styled.PostData>
    </Styled.PostContentLayout>
  );
};

export default PostContent;
