import { useState } from 'react';
import * as Styled from './PostDetail.style';
import profileImg from '../../assets/images/sample.png';
import samplePostImg from '../../assets/images/sample.png';
import { Heart, MessageCircle, MoreVertical } from 'lucide-react';
import OptionsBottomSheet from './OptionsBottomSheet';

const MAX_COMMENT_LENGTH = 200;

const PostDetail = () => {
  const post = {
    author: {
      username: '애월읍 단다단 고양이농장',
      accountId: 'farmer_dan',
      profileImage: profileImg,
    },
    content:
      '올해 첫 수확한 고양이입니다! 오랜 시간 기다린 끝에 드디어 세상 밖으로 나왔어요.\n따뜻한 햇살과 시원한 바람을 듬뿍 받으며 자란 덕분인지, 한층 더 건강하고 생기 있어 보입니다.\n처음 만나던 날의 설렘이 다시 떠오르는 순간이에요.',
    image: samplePostImg,
    createdAt: '2025-08-04T11:25:00',
    likes: 58,
    comments: 12,
  };

  const currentUser = {
    accountId: 'current_user',
    username: '현재 사용자',
    profileImage: profileImg,
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        accountId: 'user01',
        username: '서귀포시 무슨 농장',
        profileImage: profileImg,
      },
      content: '게시글 답글 ~~ !! 최고최고',
      createdAt: '2025-08-05T11:50:00',
    },
    {
      id: 2,
      author: {
        accountId: 'user02',
        username: '감귤러버',
        profileImage: profileImg,
      },
      content: '안녕하세요. 사진이 너무 멋있어요. 한라봉 언제 먹을 수 있나요? 기다리기 지쳤어요 땡벌땡벌...',
      createdAt: '2025-08-05T12:00:00',
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const formatTime = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) {
      return `${diffMins}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else {
      return created.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: {
        accountId: currentUser.accountId,
        username: currentUser.username,
        profileImage: currentUser.profileImage,
      },
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [newCommentObj, ...prev]);
    setNewComment('');
  };



const [activeSheet, setActiveSheet] = useState(null);

// 게시글 메뉴 옵션
const postOptions = [
  { label: '삭제', onClick: () => console.log('게시글 삭제') },
  { label: '신고하기', onClick: () => console.log('게시글 신고') },
];

// 댓글 메뉴 옵션
const getCommentOptions = (commentId) => [
  { label: '삭제', onClick: () => console.log('댓글 삭제', commentId) },
  { label: '신고하기', onClick: () => console.log('댓글 신고', commentId) },
];



  return (
    <Styled.Container>
      <Styled.PostWrapper>
        <img src={post.author.profileImage} alt="프로필" className="profile" />
        <div className="post-body">
          <div className="post-header">
            <div className="post-header-names">
              <span className="username">{post.author.username}</span>
              <span className="account">@{post.author.accountId}</span>
            </div>
            <MoreVertical onClick={() => setActiveSheet('post')} size={18} style={{ marginLeft: 'auto', cursor: 'pointer' }} />
          </div>

          <div className="post-content-wrapper">
            <div className="contents">
              <p className="content">{post.content}</p>
              <Styled.PostImage src={post.image} alt="게시글 이미지" />
              <div className="post-info">
                <Heart size={18} /> {post.likes}
                <MessageCircle size={18} style={{ marginLeft: '12px' }} /> {post.comments}
              </div>
              <span className="post-time">{formatTime(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </Styled.PostWrapper>

      <Styled.CommentList>
        {comments.map((c) => (
          <li key={c.id}>
            <img src={c.author.profileImage} alt="프로필" className="profile" />
            <div className="comment-body">
              <div className="comment-header">
                 <span className="comment-author">{c.author.username}</span>
                <span className="comment-time">{formatTime(c.createdAt)}</span>
        

                <MoreVertical
                  size={16}
                  style={{ marginLeft: 'auto', cursor: 'pointer' }}
                  onClick={() => setActiveSheet(`comment-${c.id}`)}
                />
              </div>
              <p className="comment-content">{c.content}</p>
            </div>
          </li>
        ))}
      </Styled.CommentList>


      <Styled.CommentInputWrapper>
        <img src={currentUser.profileImage} alt="내 프로필" className="profile" />
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

        {activeSheet && (
      <OptionsBottomSheet
        options={
              activeSheet === 'post'
                ? postOptions
                : getCommentOptions(activeSheet.split('-')[1])
            }
            onClose={() => setActiveSheet(null)}
          />
        )}

    </Styled.Container>
  );
};

export default PostDetail;
