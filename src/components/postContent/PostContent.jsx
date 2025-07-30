import { Link } from 'react-router-dom';
import {
  StyledPostActions,
  StyledPostContent,
  StyledPostData,
  StyledPostLikeButton,
  StyledCommnetButton,
  StyledCount,
} from './PostContent.style';
import { HeartIcon, MessageCircleIcon } from '../../components/icon/Icon.style';

const PostContent = () => {
  return (
    <StyledPostContent>
      <h3 className="text-ir">포스트컨텐츠 내용입니다</h3>
      컨텐츠영역역역
      <StyledPostActions>
        <StyledPostLikeButton className="hart">
          <HeartIcon />
          <StyledCount>10</StyledCount>
        </StyledPostLikeButton>
        <StyledCommnetButton to="">
          <MessageCircleIcon />
          <StyledCount>10</StyledCount>
        </StyledCommnetButton>
      </StyledPostActions>
      <StyledPostData>2020년 10월 21일</StyledPostData>
    </StyledPostContent>
  );
};

export default PostContent;
