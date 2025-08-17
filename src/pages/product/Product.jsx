import * as Styled from './Product.style';
import React, { useState, useEffect, useCallback } from 'react';
import { CameraIcon } from '../../components/icon/Icons';
import { createPost } from '../../api/productApi';
import { usePageActions } from '../../context/PageActionsContext';
import { getAccessToken } from '../../auth/tokenStore';

const Product = () => {
  const { registerAction, unregisterAction } = usePageActions();
  const baseUrl = 'https://deulbada.duckdns.org';

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [businessType, setBusinessType] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [secondaryCategories, setSecondaryCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = getAccessToken();
      
      let allCategories = [];
      let nextUrl = `${baseUrl}/categories/`;
      let pageCount = 0;
      
      while (nextUrl && pageCount < 10) {
        pageCount++;
        
        const headers = {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        };
        
        const response = await fetch(nextUrl, {
          method: 'GET',
          headers: headers,
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.results && Array.isArray(data.results)) {
            allCategories = allCategories.concat(data.results);
            nextUrl = data.next;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      
      setCategories(allCategories);
      
    } catch (error) {
      console.error('카테고리 가져오기 실패:', error);
    }
  };

  const findCategoryId = (categoryType, categoryName) => {
    const category = categories.find(cat => 
      cat.type === categoryType && cat.name === categoryName
    );
    
    return category ? category.id : null;
  };

  const getTypeOptions = () => {
    const uniqueTypes = [...new Set(categories.map(cat => cat.type))];
    
    const typeTranslation = {
      'agricultural': '농산물',
      'marine': '수산물', 
      'fishing': '수산물',
      'livestock': '축산물'
    };
    
    return uniqueTypes.map(type => ({
      value: type,
      label: typeTranslation[type] || type
    }));
  };

  const handleBusinessTypeChange = (e) => {
    const selectedType = e.target.value;
    
    setBusinessType(selectedType);
    setBusinessName('');
    setSelectedCategoryId(null);
    
    if (selectedType) {
      const filteredCategories = categories.filter(cat => cat.type === selectedType);
      const secondaries = filteredCategories.map(cat => cat.name);
      setSecondaryCategories(secondaries);
    } else {
      setSecondaryCategories([]);
    }
  };

  const handleBusinessNameChange = (e) => {
    const selectedName = e.target.value;
    
    setBusinessName(selectedName);
    
    if (selectedName && businessType) {
      const categoryId = findCategoryId(businessType, selectedName);
      setSelectedCategoryId(categoryId);
    } else {
      setSelectedCategoryId(null);
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

  const handleLinkChange = useCallback((e) => {
    const newLink = e.target.value;
    
    if (newLink.length > 200) {
      alert(`판매링크가 너무 깁니다.\n현재: ${newLink.length}자 / 최대: 200자\n\n단축 URL 서비스를 이용해주세요.`);
      return;
    }
    
    setLink(newLink);
  }, []);

  const handleTagKeyDown = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !tags.includes(trimmed)) {
        setTags(prev => [...prev, trimmed]);
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (removeTag) => {
    setTags(prev => prev.filter(tag => tag !== removeTag));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    const token = getAccessToken();
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${baseUrl}/api/uploads/images/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`이미지 업로드 실패: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      return result.image;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    }
  };

  const handleSubmitForm = async () => {
    if (isSubmitting) return;

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

    if (link.trim().length > 200) {
      alert(`판매링크가 너무 깁니다. (현재: ${link.trim().length}자, 최대: 200자)`);
      return;
    }

    try {
      new URL(link.trim());
    } catch {
      alert('올바른 URL 형식을 입력해 주세요.');
      return;
    }

    if (!selectedCategoryId) {
      alert('1차 및 2차 카테고리를 모두 선택해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (imageError) {
          console.error('이미지 업로드 실패, 이미지 없이 상품 등록 진행:', imageError);
          imageUrl = null;
        }
      }

      const productData = {
        name: name.trim(),
        description: `${name.trim()} 상품입니다.`,
        sales_link: link.trim(),
        price: parseInt(price.replace(/,/g, '')),
        ...(imageUrl ? { image_urls: imageUrl } : {}),
        category_id: selectedCategoryId,
        tag_input: tags.join(','),
      };

      await createPost(productData);
      
      alert('상품이 등록되었습니다!');
      resetForm();
    } catch (error) {
      console.error('상품 등록 실패:', error);

      if (error.response?.data) {
        const errorData = error.response.data;
        let errorMessage = '상품 등록에 실패했습니다:\n\n';
        
        Object.keys(errorData).forEach(field => {
          const fieldErrors = errorData[field];
          if (Array.isArray(fieldErrors)) {
            errorMessage += `${field}: ${fieldErrors.join(', ')}\n`;
          }
        });
        
        alert(errorMessage);
      } else if (error.request) {
        alert('네트워크 연결을 확인해주세요.');
      } else {
        alert(`상품 등록에 실패했습니다: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSubmitForm();
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setLink('');
    setBusinessType('');
    setBusinessName('');
    setTags([]);
    setTagInput('');
    setImageFile(null);
    setPreview(null);
    setSelectedCategoryId(null); 
    setSecondaryCategories([]); 
  };

  useEffect(() => {
    const saveAction = () => {
      handleSubmitForm();
    };

    registerAction('saveProfile', saveAction);

    return () => {
      unregisterAction('saveProfile');
    };
  }, [name, price, link, businessType, businessName, imageFile, tags, selectedCategoryId]); 

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

      <Styled.InputGroup>
        <Styled.ImageLabel>이미지 등록</Styled.ImageLabel>

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
            <CameraIcon color="#fff" size={22} />
          </Styled.IconWrapper>
        </Styled.ImageUploadWrapper>
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="name">상품명</Styled.Label>
        <Styled.InputText
          id="name"
          type="text"
          placeholder="2~30자 이내여야 합니다."
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          placeholder="URL을 입력해 주세요 (최대 200자)"
          value={link}
          onChange={handleLinkChange}
        />
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="business-type">1차 카테고리</Styled.Label>
        <Styled.Select id="business-type" value={businessType} onChange={handleBusinessTypeChange}>
          <option value="">카테고리를 선택해주세요</option>
          {getTypeOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Styled.Select>
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="business-name">2차 카테고리</Styled.Label>
        <Styled.Select
          id="business-name"
          value={businessName}
          onChange={handleBusinessNameChange}
          disabled={!businessType}
        >
          <option value="">세부 카테고리를 선택해주세요</option>
          {secondaryCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Styled.Select>
      </Styled.InputGroup>

      <Styled.InputTag>
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
      </Styled.InputTag>

      <Styled.Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '등록 중...' : '상품 등록'}
      </Styled.Button>
    </Styled.Form>
  );
};

export default Product;