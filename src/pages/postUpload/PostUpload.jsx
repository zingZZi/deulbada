import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Styled from './PostUpload.style';
import UploadImagePreview from './UploadImagePreview';
import { Image } from 'lucide-react';
import { usePageActions } from '../../context/PageActionsContext';
import profileImg from '../../assets/images/sample.png';
import { getAccessToken } from '../../auth/tokenStore';
import { fetchUser } from '../../api/userApi';
import { getPostDetail, updatePost } from '../../api/postApi';

// 상대 경로("/media/..")를 절대 URL로 변환
const toAbsoluteUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;     // 이미 절대 경로면 그대로
  if (url.startsWith('/')) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
};

const API_BASE = 'https://deulbada.duckdns.org';
const POST_ENDPOINT = `${API_BASE}/posts/new/`;

// 에러 메시지 추출 함수 추가
const pickErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    return errorData.message || errorData.error || `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status} - ${response.statusText}`;
  }
};

const PostUpload = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // 편집 모드 판단용
  const isEdit = Boolean(postId); // edit 여부
  const [text, setText] = useState('');
  const [images, setImages] = useState([]); // 새로 추가한 이미지(File)
  const [originImages, setOriginImages] = useState([]); // 서버에 이미 있던 이미지(표시/삭제용)
  const [removedOriginIds, setRemovedOriginIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);
  const [myProfileImage, setMyProfileImage] = useState(profileImg); // 기본 이미지로 초기화

  const fileInputRef = useRef();
  const containerRef = useRef(null);

  // 편집 모드일 때 초기 데이터 로드
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data } = await getPostDetail(postId);
        // 백엔드 응답 구조에 맞게 조정
        setText(data?.content || '');
        // 서버 이미지 목록(id, url 형태라고 가정)
        const imgs = Array.isArray(data?.image_urls)
          ? data.image_urls.map((u, i) => ({ id: `origin-${i}`, url: toAbsoluteUrl(u) }))
          : [];
        setOriginImages(imgs);
      } catch (e) {
        console.error(e);
        alert('게시글 정보를 불러올 수 없습니다.');
        navigate(-1);
      }
    })();
  }, [isEdit, postId, navigate]);

  // 현재 사용자 프로필 이미지 가져오기
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const useraccountId = window.localStorage.getItem('account_id');
        if (useraccountId) {
          const userInfo = await fetchUser(useraccountId);
          const userInfodata = userInfo.data;
          if (userInfodata?.profile_image) {
            setMyProfileImage(userInfodata.profile_image);
          }
        }
      } catch (error) {
        console.error('사용자 프로필 정보를 불러오지 못했습니다:', error);
        // 에러가 발생해도 기본 이미지를 사용하므로 별도 처리하지 않음
      }
    };

    getUserProfile();
  }, []);

  // FAB 위치 보정 (기존 그대로)
  useEffect(() => {
    const root = containerRef.current ?? document.documentElement;

    const getNavHeight = () => {
      const nav = document.querySelector('[data-bottom-nav]');
      return nav ? nav.offsetHeight : 0;
    };

    const updateFab = () => {
      const GAP = 16;
      const navH = getNavHeight();
      let bottom = navH + GAP;

      if (window.visualViewport) {
        const vv = window.visualViewport;
        const keyboard = Math.max(0, window.innerHeight - vv.height - (vv.offsetTop || 0));
        if (keyboard > 0) bottom = keyboard + GAP;
      }
      root.style.setProperty('--fab-bottom', `${bottom}px`);
    };

    updateFab();

    const nav = document.querySelector('[data-bottom-nav]');
    const ro = nav ? new ResizeObserver(updateFab) : null;
    ro?.observe(nav);

    const onResize = () => updateFab();
    window.addEventListener('resize', onResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize);
      window.visualViewport.addEventListener('scroll', onResize);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', onResize);
        window.visualViewport.removeEventListener('scroll', onResize);
      }
      ro?.disconnect();
    };
  }, []);

  // 미리보기 URL 정리 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, [images]);

  const { registerAction, unregisterAction } = usePageActions();
  const registerRef = useRef(registerAction);
  const unregisterRef = useRef(unregisterAction); 
  // 컨텍스트 함수 아이덴티티가 바뀌어도 effect를 재실행하지 않도록 ref만 갱신
  useEffect(() => { registerRef.current = registerAction; }, [registerAction]);
  useEffect(() => { unregisterRef.current = unregisterAction; }, [unregisterAction]);

  // ✅ 실제 업로드 로직 - PostDetail 패턴에 맞춰 수정
  const submitPost = useCallback(async () => {
    if (submitLockRef.current || isSubmitting) return;
    submitLockRef.current = true;
    const content = text.trim();

    // 최소 입력 검증: 텍스트나 이미지 둘 중 하나는 있어야 함
    if (!content && images.length === 0) {
      alert('내용 또는 이미지를 입력해주세요.');
      return;
    }

    // 업로드 제한(예: 최대 1장)
    if (images.length > 1) {
      alert('이미지는 최대 1장까지 업로드할 수 있어요.');
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('content', content);

      if (images.length > 0) {
        formData.append('image', images[0].file);
      }

      // 디버깅: FormData 내용 확인
      console.log('FormData 내용:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // PostDetail에서 사용하는 토큰 방식과 동일하게 수정
      const token = getAccessToken?.() || localStorage.getItem('accessToken');

      const res = await fetch(POST_ENDPOINT, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          // FormData 전송 시 Content-Type 헤더는 자동 설정되도록 제거
        },
        body: formData,
      });

      if (!res.ok) {
        const msg = await pickErrorMessage(res);
        throw new Error(msg);
      }

      const response = await res.json();
      console.log('서버 응답:', response); // 디버깅용
      console.log('서버 응답의 data:', response.data); // 추가 디버깅
      console.log('추출된 data:', response.data || response); // 추가 디버깅
      // PostDetail 패턴에 맞춰 response.data에서 데이터 추출
      const data = response.data || response;

      // 성공 후 초기화
      setText('');
      setImages((prev) => {
        prev.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        return [];
      });

      // UX: 업로드 성공 안내
      alert('게시글이 업로드되었습니다.');

      // PostDetail에서 사용하는 ID 구조에 맞춰 수정
      const newPostId = data?.id || data?.post_id || data?.post?.id;
      
      if (newPostId) {
        // PostDetail 라우트 패턴에 맞춰 이동
        navigate(`/postDetail/${newPostId}`);
      } else {
        // ID가 없으면 메인 페이지로 이동
        navigate('/');
      }
    } catch (error) {
      console.error('게시글 업로드 실패:', error);
      alert(error.message || '업로드 도중 오류가 발생했어요.');
    } finally {
      setIsSubmitting(false);
      submitLockRef.current = false;
    }
  }, [text, images, isSubmitting, navigate]);

  // ★ 편집 제출 함수 추가
  const submitUpdate = useCallback(async () => {
    if (submitLockRef.current || isSubmitting) return;
    submitLockRef.current = true;
    const content = text.trim();
    if (!content && images.length === 0 && removedOriginIds.length === 0) {
      alert('변경 사항이 없습니다.');
      return;
    }

    try {
      setIsSubmitting(true);
      const form = new FormData();
      form.append('content', content);

      // 새로 추가된 이미지
      if (images[0]) {
        form.append('image', images[0].file); // 단일
      }

      // 서버에 있던 것 중 삭제할 이미지 id 리스트(백엔드 스펙에 맞춤)
      // 예시: DRF에서 ArrayField 수용 시 'delete_image_ids' 로 보냄
      if (removedOriginIds.length > 0) {
        removedOriginIds.forEach(id => form.append('delete_image_ids', id));
        // 또는 form.append('delete_image_ids', JSON.stringify(removedOriginIds));
      }

      await updatePost(postId, form);
      // 성공 → 상세 페이지로 이동
      navigate(`/postDetail/${postId}`, { replace: true });
    } catch (e) {
      console.error(e);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
      submitLockRef.current = false;
    }
  }, [text, images, removedOriginIds, isSubmitting, navigate]);

  const postHandlerRef = useRef(submitPost);
  const updateHandlerRef = useRef(submitUpdate);

  // 🔹 submitPost/submitUpdate가 바뀔 때 ref만 갱신 (state 변경 X)
  useEffect(() => { postHandlerRef.current = submitPost; }, [submitPost]);
  useEffect(() => { updateHandlerRef.current = submitUpdate; }, [submitUpdate]);

  // 🔹 registerAction에 넘길 "고정 함수" (의존성 없음)
  const stablePostAction = useCallback(() => {
    return postHandlerRef.current?.();
  }, []);

  const stableUpdateAction = useCallback(() => {
    return updateHandlerRef.current?.();
  }, []);

  useEffect(() => {
    const reg = registerRef.current;
    const unreg = unregisterRef.current;
    if (isEdit) {
      reg('update-post', stableUpdateAction);
      return () => unreg('update-post');
    } else {
      reg('submit-post', stablePostAction);
      return () => unreg('submit-post');
    }
  // 🔒 컨텍스트 함수는 ref로 고정, deps는 isEdit과 고정 콜백만
  }, [isEdit, stablePostAction, stableUpdateAction]);

  // ------ 이미지 UI 부분: 서버 이미지 + 새 이미지 함께 표시 ------
  // 기존 이미지 카드에 "X" 버튼 추가해서 제거 시 removedOriginIds에 기록
  const removeOrigin = (imgId) => {
    setOriginImages(prev => prev.filter(img => img.id !== imgId));
    setRemovedOriginIds(prev => [...prev, imgId]);
  };

  // 이미지 선택
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 이미지 파일 검증
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return false;
      }
      // 파일 크기 제한 (예: 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('파일 크기는 10MB 이하여야 합니다.');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const mapped = validFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    // 최대 1장 제한
    setImages((prev) => {
      const next = [...prev, ...mapped].slice(0, 1);
      if (prev.length + mapped.length > 1) {
        alert('이미지는 최대 1장까지 업로드할 수 있어요.');
      }
      return next;
    });

    // 파일 입력값 초기화(동일 파일 다시 선택 가능하게)
    e.target.value = '';
  };

  // 이미지 제거
  const handleDeleteImage = (idxToRemove) => {
    setImages((prev) => {
      const target = prev[idxToRemove];
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== idxToRemove);
    });
  };

  // 텍스트 자동 높이 + 상태 반영
  const handleChange = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(textarea.value);
  };

  return (
    <Styled.Container ref={containerRef}>
      <Styled.HiddenFileInput
        type="file"
        accept="image/*"
        // multiple
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <Styled.TextAndProfile>
        <Styled.ProfileImage src={myProfileImage} alt="프로필" />

        <Styled.TextArea
          placeholder="게시글 입력하기"
          maxLength={400}
          value={text}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </Styled.TextAndProfile>

      <Styled.ImageUploadSection>
        <Styled.PreviewScroller>
          {originImages.map(img => (
            <UploadImagePreview
              key={`origin-${img.id}`}
              src={img.url}
              onDelete={() => removeOrigin(img.id)}
            />
          ))}

          {/* 새로 추가한 이미지 */}
          {images.map((img, idx) => (
            <UploadImagePreview
              key={`new-${idx}`}
              src={img.previewUrl}
              onDelete={() => handleDeleteImage(idx)}
            />
          ))}
        </Styled.PreviewScroller>
      </Styled.ImageUploadSection>

      <Styled.ImageButtonWrapper
        type="button"
        onClick={() => !isSubmitting && fileInputRef.current?.click()}
        aria-disabled={isSubmitting}
      >
        <Image color='#ffffff' size={28} />
      </Styled.ImageButtonWrapper>
    </Styled.Container>
  );
};

export default PostUpload;