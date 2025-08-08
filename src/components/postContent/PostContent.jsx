import { Link } from 'react-router-dom';
import * as Styled from './PostContent.style';
import { HeartIcon, MessageCircleIcon } from '../../components/icon/Icon.style';
// import { fetchLike } from '../../api/postApi';
// import { useEffect, useState } from 'react';

const PostContent = ({ images, contet, date, id }) => {
  const dateChange = new Date(date);
  const koreaTime = dateChange.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // const [likeCount, setLikeCount] = useState(0);

  // useEffect(() => {
  //   const getLike = async () => {
  //     try {
  //       const response = await fetchLike(id);
  //       console.log(response);
  //       setLikeCount(response.data.result);
  //     } catch (error) {
  //       console.error('좋아요 못불러옴', error);
  //     }
  //   };
  //   getLike();
  // }, []);
  return (
    <Styled.PostContentLayout>
      <h3 className="text-ir">포스트컨텐츠 내용입니다</h3>
      <p>{contet}</p>
      {images &&
        images.length > 0 &&
        images.map((e, i) => {
          return <img key={i} src={e} alt="업로드이미지" />;
        })}

      <Styled.PostActions>
        <Styled.PostLikeButton className="hart">
          <HeartIcon />
          <Styled.Count>0</Styled.Count>
        </Styled.PostLikeButton>
        <Styled.CommnetButton to={`/posts/${id}`}>
          <MessageCircleIcon />
          <Styled.Count>10</Styled.Count>
        </Styled.CommnetButton>
      </Styled.PostActions>
      <Styled.PostData>{koreaTime}</Styled.PostData>
    </Styled.PostContentLayout>
  );
};

export default PostContent;
