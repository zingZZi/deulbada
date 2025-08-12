import * as Styled from './product.style';
import React, { useState, useEffect } from 'react';
import { ImageIcon } from '../../components/icon/Icons';
import { createPost } from "../../api/productApi";

const Product = () => {
  // 상태 관리 (중복 제거)
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [businessType, setBusinessType] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');

  // 이미지 업로드 함수
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://your-api.com/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      return result.imageUrl;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    }
  };

  // 폼 제출 처리 (통합된 버전)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!name?.trim()) {
      alert('상품명을 입력해 주세요.');
      return;
    }
    
    if (!price?.trim()) {
      alert('가격을 입력해 주세요.');
      return;
    }
    
    if (!link?.trim()) {
      alert('판매링크를 입력해 주세요.');
      return;
    }
    
    if (!businessType) {
      alert('카테고리를 선택해 주세요.');
      return;
    }

    try {
      let imageUrl = null;

      // 이미지가 있으면 먼저 업로드
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // 상품 데이터 준비
      const productData = {
        image_urls: imageUrl ? [imageUrl] : [],
        name: name.trim(),
        price: parseInt(price.replace(/,/g, '')),
        description: link.trim(), // link를 description으로 사용
        tags,
        category: businessType,
      };

      console.log('상품 저장 요청:', productData);
      
      // API 호출
      await createPost(productData);
      alert('상품이 등록되었습니다!');
      
      // 폼 초기화
      resetForm();
      
    } catch (error) {
      console.error('상품 등록 실패:', error);
      alert('상품 등록에 실패했습니다.');
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setName('');
    setPrice('');
    setLink('');
    setBusinessType('');
    setTags([]);
    setTagInput('');
    setImageFile(null);
    setPreview(null);

  };

  // 태그 입력 처리
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

  // 태그 제거
  const handleTagRemove = (removeTag) => {
    setTags((prev) => prev.filter((tag) => tag !== removeTag));
  };

  // 이미지 변경 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 이전 미리보기 URL 해제
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 가격 포맷팅
  const formatPrice = (value) => {
    const onlyNumber = value.replace(/[^0-9]/g, '');
    return onlyNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 가격 변경 처리
  const handlePriceChange = (e) => {
    const formatted = formatPrice(e.target.value);
    setPrice(formatted);
  };

  // 컴포넌트 언마운트 시 미리보기 URL 해제
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.H2 className="text-ir">상품등록</Styled.H2>

      {/* 이미지 업로드 */}
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
      

      {/* 상품명 */}
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

      {/* 가격 */}
      <Styled.InputGroup>
        <Styled.Label htmlFor="price">가격</Styled.Label>
        <Styled.InputText
          id="price"
          type="text"
          inputMode="numeric"
          placeholder="숫자만 입력 가능합니다."
          value={price}
          onChange={handlePriceChange}
        />
      </Styled.InputGroup>


      {/* 판매링크 */}
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

      {/* 태그 */}
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


      {/* 카테고리 */}
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

      <Styled.Button type="submit">상품 등록</Styled.Button>

    </Styled.Form>
  );
};

export default Product;