/* eslint-disable no-dupe-keys */
import { useEffect, useState, useRef } from 'react';
import * as Styled from './PostDetail.style';
import OptionsBottomSheet from './OptionsBottomSheet';
import { useParams } from 'react-router-dom';
import { createComment, getPostDetail } from '../../api/postApi';
import UserInfo from '../../components/userInfo/UserInfo';
import PostContent from '../../components/postContent/PostContent';
import Comment from './comment/Commnet';
import { fetchUser } from '../../api/userApi';

const MAX_COMMENT_LENGTH = 200;
const PostDetail = () => {
  const useraccountId = window.localStorage.getItem('account_id');
  const [myProfileImage, setMyProfileImage] = useState(null);
  const [myUserInfo, setMyUserInfo] = useState(null); // 현재 사용자 전체 정보 저장
  const [newComment, setNewComment] = useState('');

  const commentRef = useRef(); // Comment 컴포넌트 참조용

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const commentData = {
        content: newComment.trim(),
      };
      const response = await createComment(postId, commentData);
      const newCommentData = response.data;

      // 📌 새 댓글에 현재 사용자 정보 완전히 재구성
      const enhancedCommentData = {
        ...newCommentData,
        user: {
          account_id: useraccountId,
          username: myUserInfo?.username || '사용자',
          profile_image: myProfileImage,
          // 기존 서버 응답 정보도 보존
          ...(newCommentData.user || {}),
          // 하지만 위의 정보들로 덮어쓰기
          account_id: useraccountId,
          username: myUserInfo?.username || '사용자',
          profile_image: myProfileImage,
        },
      };

      // 댓글 입력창 초기화
      setNewComment('');
      // 댓글 카운트 업데이트
      setPostData((prevData) => ({
        ...prevData,
        comment_count: prevData.comment_count + 1,
      }));

      // Comment 컴포넌트에 새 댓글 바로 추가
      if (commentRef.current && commentRef.current.addNewComment) {
        commentRef.current.addNewComment(enhancedCommentData);
      }
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      // 에러 처리
    }
  };

  const handleCommentCountDecrease = () => {
    setPostData((prevData) => ({
      ...prevData,
      comment_count: Math.max(0, prevData.comment_count - 1),
    }));
  };

  const { postId } = useParams();
  const [postData, setPostData] = useState();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await getPostDetail(postId);
        const data = response.data;

        const userInfo = await fetchUser(useraccountId);
        const userInfodata = userInfo.data;

        // 📌 사용자 정보 전체를 저장
        setMyUserInfo(userInfodata);
        setMyProfileImage(userInfodata.profile_image);
        setPostData(data);
      } catch (error) {
        console.error('Post를 불러오지 못했습니다.', error);
      }
    };
    getPost();
  }, [postId]);

  //게시글관련
  const removePostFromList = (postId) => {
    setPostData((prevList) => prevList.filter((post) => post.id !== postId));
  };

  return (
    <Styled.Container>
      {postData ? (
        <>
          <Styled.HeightWrap>
            <Styled.PostSection>
              <h2 className="text-ir">게시글 상세페이지</h2>
              <Styled.PostWrapper>
                <UserInfo
                  id={postData.id}
                  username={postData.author.username}
                  accountId={postData.author.account_id}
                  feedList={true}
                  profileImg={postData.author.profile_image}
                  to={`/profile/${postData.author.account_id}`}
                  feedData={postData}
                  is_farm_verified={postData.author_is_farm_verified}
                  onPostDeleted={removePostFromList}
                />
                <PostContent
                  content={postData.content}
                  images={postData.image_urls}
                  date={postData.created_at}
                  id={postData.id}
                  like={postData.like_count}
                  isLiked={postData.is_liked}
                  comment={postData.comment_count}
                />
              </Styled.PostWrapper>
            </Styled.PostSection>
            <Styled.CommentSection>
              <h3 className="text-ir">댓글영역</h3>
              <Comment
                ref={commentRef}
                postId={postId}
                onCommentCountChange={handleCommentCountDecrease}
              />
            </Styled.CommentSection>
          </Styled.HeightWrap>
          <Styled.CommentSection>
            <h3 className="text-ir">댓글작성영역</h3>
            <Styled.CommentInputWrapper>
              <Styled.ImgWrap>
                <img src={myProfileImage} alt="내 프로필" />
              </Styled.ImgWrap>

              <div className="input-area">
                <input
                  type="text"
                  placeholder="댓글을 입력하세요..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleAddComment()}
                  maxLength={MAX_COMMENT_LENGTH}
                />
              </div>
              <button
                className={newComment.trim() ? 'active' : ''}
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                게시
              </button>
            </Styled.CommentInputWrapper>
          </Styled.CommentSection>
        </>
      ) : (
        <></>
      )}
    </Styled.Container>
  );
};

export default PostDetail;
