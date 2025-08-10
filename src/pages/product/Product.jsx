import * as Styled from './product.style';
import React, { useState } from 'react';
import DefaultHeader from '../../components/header/defaultHeader/DefaultHeader';
import { ImageIcon } from '../../components/icon/Icons';
import { createPost } from "../../api/productApi";
import { useLocation, useNavigate } from 'react-router-dom';

const Product = () => {
  const [preview, setPreview] = useState(null);
  const [businessType, setBusinessType] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [link, setLink] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

    const handleHeaderAction = (key) => {
      if (key === 'saveProfile') {
        // 폼 제출 직접 실행
        const fakeEvent = { preventDefault: () => {} };
        handleSubmit(fakeEvent);
      }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://your-api.com/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result.imageUrl; 
  };

const handleSubmit = async (e) => {
  e.preventDefault();

    if (!name || !price || !link || !businessType) {
    alert('모든 필수 항목을 입력해 주세요.');
    return;
  }

    try {
      let imageUrl = null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const data = {
        image_urls: imageUrl ? [imageUrl] : [],
        name,
        price: parseInt(price.replace(/,/g, '')),
        description: link,
        tags,
        category: businessType,
        
      };

      await createPost(data);
      alert('상품이 등록되었습니다!');
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert('상품 등록에 실패했습니다.');
    }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

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
  <DefaultHeader location={location} onAction={handleHeaderAction} />

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
        onChange={(e) => setName(e.target.value)} />
    </Styled.InputGroup>

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
      <Styled.Label htmlFor="category">카테고리</Styled.Label>
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