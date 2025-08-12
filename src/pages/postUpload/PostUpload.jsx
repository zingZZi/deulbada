import React, { useRef, useState, useEffect } from 'react';
import * as Styled from './PostUpload.style';
import UploadImagePreview from './UploadImagePreview';
import { Image } from 'lucide-react';
import { usePageActions } from '../../context/PageActionsContext';
import profileImg from '../../assets/images/sample.png';

const PostUpload = () => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const fileInputRef = useRef();
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current ?? document.documentElement;

    const getNavHeight = () => {
      const nav = document.querySelector('[data-bottom-nav]');
      return nav ? nav.offsetHeight : 0;
    };

    const updateFab = () => {
      const GAP = 16;
      const navH = getNavHeight();

      // 기본: 하단 네비 위 16px
      let bottom = navH + GAP;

      // 키보드가 뜨면 visualViewport로 보정
      if (window.visualViewport) {
        const vv = window.visualViewport;
        const keyboard = Math.max(0, window.innerHeight - vv.height - (vv.offsetTop || 0));
        if (keyboard > 0) bottom = keyboard + GAP; // 키보드 위 16px
      }

      root.style.setProperty('--fab-bottom', `${bottom}px`);
    };

    // 최초 계산
    updateFab();

    // 네비 높이 변화를 감지
    const nav = document.querySelector('[data-bottom-nav]');
    const ro = nav ? new ResizeObserver(updateFab) : null;
    ro?.observe(nav);

    // 뷰포트/키보드 변화 감지
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

  const { registerAction, unregisterAction } = usePageActions();

  const submitPost = () => {
    console.log('게시글 업로드 실행');
    console.log('내용:', text);
    console.log('이미지:', images);
    // API 연동 추가하면 됨
  };

  useEffect(() => {
    registerAction('submit-post', submitPost);
    return () => unregisterAction('submit-post');
  }, [text, images]);

  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  const mapped = files.map((file) => ({
    file,
    previewUrl: URL.createObjectURL(file),
  }));
  setImages((prev) => [...prev, ...mapped].slice(0, 5));
};

  const handleDeleteImage = (idxToRemove) => {
    setImages((prev) => prev.filter((_, i) => i !== idxToRemove));
  };

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
        multiple
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <Styled.TextAndProfile>
        <Styled.ProfileImage src={profileImg} alt="프로필" />

        <Styled.TextArea
          placeholder="게시글 입력하기"
          maxLength={400}
          value={text}
          onChange={handleChange}
        />
      </Styled.TextAndProfile>

      <Styled.ImageUploadSection>
        <Styled.PreviewScroller>
          {images.map((img, idx) => (
            <UploadImagePreview
              key={idx}
              src={img.previewUrl}
              onDelete={() => handleDeleteImage(idx)}
            />
          ))}
        </Styled.PreviewScroller>
      </Styled.ImageUploadSection>

      <Styled.ImageButtonWrapper
        type="button"
        onClick={() => fileInputRef.current.click()}
      >
        <Image color="#ffffff" size={28} />
      </Styled.ImageButtonWrapper>
    </Styled.Container>
  );
};

export default PostUpload;
