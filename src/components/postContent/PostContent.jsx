import { Link } from 'react-router-dom';
import * as Styled from './PostContent.style';
import { HeartIcon, MessageCircleIcon } from '../../components/icon/Icon.style';

const PostContent = () => {
  return (
    <Styled.PostContentLayout>
      <h3 className="text-ir">포스트컨텐츠 내용입니다</h3>
      컨텐츠영역역역
      <Styled.PostActions>
        <Styled.PostLikeButton className="hart">
          <HeartIcon />
          <Styled.Count>10</Styled.Count>
        </Styled.PostLikeButton>
        <Styled.CommnetButton to="">
          <MessageCircleIcon />
          <Styled.Count>10</Styled.Count>
        </Styled.CommnetButton>
      </Styled.PostActions>
      <Styled.PostData>2020년 10월 21일</Styled.PostData>
    </Styled.PostContentLayout>
  );
};

export default PostContent;
