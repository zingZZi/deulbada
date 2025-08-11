import * as Styled from './product.style';
import React, { useState, useEffect } from 'react';
import { ImageIcon } from '../../components/icon/Icons';
import DefaultHeader from '../../components/header/defaultHeader/DefaultHeader';
import { useLocation } from 'react-router-dom';
import api from '../../api/api';
import { getAccessToken } from '../../auth/tokenStore';

const Product = () => {
  const location = useLocation();  
  const [preview, setPreview] = useState(null);
  const [businessType, setBusinessType] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');            
  const [link, setLink] = useState('');  
  const [imageInfo, setImageInfo] = useState(null);

  const onHeaderAction = (actionKey) => {
    if (actionKey === 'saveProfile') {
      saveProfileData();
    }
  };

  // 이미지 업로드 함수 (api 인스턴스 사용: JWT 자동 첨부)
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append('image', file);

    const { data } = await api.post('/api/uploads/images/', fd, {
      // ❗ Axios는 FormData면 Content-Type을 자동으로 boundary까지 맞춰줍니다.
      // 오히려 수동으로 넣으면 boundary 빠져서 415/400 납니다.
      headers: { 'Content-Type': undefined },
      __skipAuthRedirect: true, // (디버그용) 401이어도 로그인페이지로 튕기지 않게
    });
    return Array.isArray(data.results) ? data.results[0] : data;
  };

  // 이미지 변경 이벤트 핸들러
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return alert('이미지 파일만 업로드할 수 있어요.');
    const MAX = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX) return alert('이미지 크기는 5MB 이하만 가능합니다.');

  setPreview(URL.createObjectURL(file));

  console.log('[UPLOAD] token now:', getAccessToken()); // 값이 보여야 정상

    try {
      // 이미지 업로드 API 호출
      const info = await uploadImage(file);
      setImageInfo(info); 
      console.log('업로드 성공:', info);
    } catch (err) {
      console.error('업로드 실패:', err);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const saveProfileData = async () => {
    const payload = {
      imageUrl: imageInfo?.image,
      hasImage: !!imageInfo,
      name,
      price: price.replaceAll(',', ''),
      link,
      tags,
      category: businessType,
    };
    if (!payload.name.trim()) return alert('상품명을 입력해 주세요.');
    if (!payload.price.trim()) return alert('가격을 입력해 주세요.');

    console.log('상품 저장 요청:', payload);
    await new Promise(r => setTimeout(r, 600)); // TODO: API 연동
    alert('상품이 저장되었습니다.');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('폼 제출됨');
  };

  const handleTagKeyDown = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !tags.includes(trimmed)) {
        setTags((prev) => [...prev, trimmed]);
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (removeTag) => {
  setTags((prev) => prev.filter((tag) => tag !== removeTag));
};

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const formatPrice = (value) => {
    const onlyNumber = value.replace(/[^0-9]/g, '');
    return onlyNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePriceChange = (e) => {
    const formatted = formatPrice(e.target.value);
    setPrice(formatted);
  };

  return (
  <Styled.Form onSubmit={handleSubmit}>

    <Styled.ProductHeaderWrapper>
      <DefaultHeader location={location} onAction={onHeaderAction} />
    </Styled.ProductHeaderWrapper>

    <Styled.Border></Styled.Border>

    <Styled.H2 className="text-ir">상품등록</Styled.H2>

    <Styled.InputGroup>
      <Styled.Label>이미지 등록</Styled.Label>

      <Styled.ImageUploadWrapper htmlFor="image-upload">
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />

        {preview && <img src={preview} alt="업로드 미리보기" />}
        
        <Styled.IconWrapper>
          <ImageIcon color="#fff" size={22} />
        </Styled.IconWrapper>
      </Styled.ImageUploadWrapper>
    </Styled.InputGroup>
    
    <Styled.InputGroup>
      <Styled.Label htmlFor="name">상품명</Styled.Label>
      <Styled.InputText 
        id="name" 
        type="text" 
        placeholder="2~15자 이내여야 합니다."
        maxLength={15}
        value={name}                             
        onChange={(e) => setName(e.target.value)} 
      />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="price">가격</Styled.Label>
      <Styled.InputText
        id="price"
        type="text"
        placeholder="숫자만 입력 가능합니다."
        value={price}
        onChange={handlePriceChange}
      />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="link">판매링크</Styled.Label>
      <Styled.InputText 
        id="link" 
        type="url" 
        placeholder="URL을 입력해 주세요." 
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="tag">태그</Styled.Label>
      <Styled.InputText
        id="tag"
        type="text"
        placeholder="쉼표(,)를 이용해 여러 개의 태그를 입력하세요"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagKeyDown}
    />

    <Styled.TagList>
      {tags.map((tag, index) => (
        <Styled.Tag key={index}>
          #{tag}
          <Styled.RemoveButton onClick={() => handleTagRemove(tag)}>×</Styled.RemoveButton>
        </Styled.Tag>
      ))}
    </Styled.TagList>

    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="business-type">카테고리</Styled.Label>
        <Styled.Select
          id="business-type"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
        >
          <option value="">카테고리를 선택해주세요</option>
          <option value="retail">농산물</option>
          <option value="wholesale">수산물</option>
        </Styled.Select>
    </Styled.InputGroup>

  </Styled.Form>

  );


};

export default Product;