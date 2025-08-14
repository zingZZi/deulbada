import * as Styled from './Product.style';
import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { createPost } from '../../api/productApi';
import { usePageActions } from '../../context/PageActionsContext';
import { getAccessToken } from '../../auth/tokenStore'; // 토큰 가져오기

const Product = () => {
  const { registerAction, unregisterAction } = usePageActions();

  const baseUrl = 'https://deulbada.duckdns.org';

  // 상태 관리
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

  // 백엔드 카테고리 관련 상태 추가
  const [categories, setCategories] = useState([]); // 전체 카테고리 목록
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // 선택된 카테고리의 ID
  const [secondaryCategories, setSecondaryCategories] = useState([]); // 2차 카테고리 목록

  // 컴포넌트 마운트 시 카테고리 목록 가져오기
  useEffect(() => {
    fetchCategories();
    
    // 임시 테스트용 하드코딩 데이터 (API 실패시 대체용)
    setTimeout(() => {
      if (categories.length === 0) {
        console.log('⚠️ API에서 카테고리를 가져오지 못했습니다. 임시 데이터를 사용합니다.');
        const testCategories = [
          { id: 1, category_type: "농산물", category_name: "과일류" },
          { id: 2, category_type: "농산물", category_name: "채소류" },
          { id: 3, category_type: "농산물", category_name: "곡류·잡곡" },
          { id: 4, category_type: "수산물", category_name: "생선류" },
          { id: 5, category_type: "수산물", category_name: "조개류" },
          { id: 6, category_type: "수산물", category_name: "갑각류" },
        ];
        setCategories(testCategories);
        console.log('임시 카테고리 데이터 설정 완료:', testCategories);
      }
    }, 3000); // 3초 후 임시 데이터 설정
  }, []);

  // 카테고리 목록 가져오기
  const fetchCategories = async () => {
    try {
      console.log('=== 카테고리 목록 가져오기 시작 ===');
      const token = getAccessToken();
      console.log('토큰 존재:', !!token);
      
      const response = await fetch(`${baseUrl}/api/categories/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      });
      
      console.log('카테고리 API 응답 상태:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('카테고리 데이터 타입:', typeof data);
        console.log('카테고리 데이터 길이:', Array.isArray(data) ? data.length : '배열이 아님');
        console.log('카테고리 전체 데이터:', data);
        
        // 데이터가 배열인지 확인
        if (Array.isArray(data)) {
          setCategories(data);
          console.log('카테고리 설정 완료');
          
          // 첫 번째 카테고리 구조 확인
          if (data.length > 0) {
            console.log('첫 번째 카테고리 구조:', data[0]);
            console.log('첫 번째 카테고리 키들:', Object.keys(data[0]));
          }
        } else {
          console.error('카테고리 데이터가 배열이 아닙니다:', data);
          // 혹시 data.results 형태인지 확인
          if (data.results && Array.isArray(data.results)) {
            console.log('results 배열 발견, 이를 사용합니다');
            setCategories(data.results);
          }
        }
      } else {
        console.error('카테고리 가져오기 실패:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('에러 내용:', errorText);
      }
    } catch (error) {
      console.error('카테고리 가져오기 오류:', error);
    }
  };

  // 카테고리 ID 찾기 함수
  const findCategoryId = (primaryCategory, secondaryCategory) => {
    const category = categories.find(cat => 
      cat.category_type === primaryCategory && cat.category_name === secondaryCategory
    );
    return category ? category.id : null;
  };

  // 1차 카테고리 변경 시 2차 카테고리 업데이트 및 카테고리 ID 설정 (수정)
  const handleBusinessTypeChange = (e) => {
    const selectedType = e.target.value;
    console.log('=== 1차 카테고리 선택 ===');
    console.log('선택된 1차 카테고리:', selectedType);
    console.log('현재 카테고리 목록 길이:', categories.length);
    
    setBusinessType(selectedType);
    setBusinessName('');
    setSelectedCategoryId(null);
    
    if (selectedType) {
      // 해당 1차 카테고리의 2차 카테고리들 필터링
      const secondaries = categories
        .filter(cat => {
          console.log('필터링 중:', cat.category_type, '===', selectedType, '?', cat.category_type === selectedType);
          return cat.category_type === selectedType;
        })
        .map(cat => cat.category_name);
      
      console.log('필터링된 2차 카테고리들:', secondaries);
      setSecondaryCategories([...new Set(secondaries)]); // 중복 제거
    } else {
      setSecondaryCategories([]);
    }
  };

  // 2차 카테고리 변경 시 카테고리 ID 설정
  const handleBusinessNameChange = (e) => {
    const selectedName = e.target.value;
    console.log('=== 2차 카테고리 선택 ===');
    console.log('선택된 2차 카테고리:', selectedName);
    console.log('현재 1차 카테고리:', businessType);
    
    setBusinessName(selectedName);
    
    if (selectedName && businessType) {
      const categoryId = findCategoryId(businessType, selectedName);
      console.log('찾은 카테고리 ID:', categoryId);
      setSelectedCategoryId(categoryId);
    } else {
      setSelectedCategoryId(null);
    }
  };

  // 이미지 업로드 함수 (성공한 방식으로 고정)
  const uploadImage = async (file) => {
    console.log('=== 이미지 업로드 시작 ===');
    console.log('파일:', file.name, '크기:', file.size, '타입:', file.type);

    // 토큰 가져오기
    const token = getAccessToken();
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
    }

    try {
      const formData = new FormData();
      formData.append('image', file); // 성공한 필드명: 'image'

      const response = await fetch(`${baseUrl}/api/uploads/images/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('이미지 업로드 응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`이미지 업로드 실패: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log('이미지 업로드 성공:', result);
      
      // 성공 응답에서 이미지 URL 추출
      return result.image; // result.image에 URL이 있음
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    }
  };

  // 폼 제출 처리 함수 (백엔드 요구사항에 맞게 수정)
  const handleSubmitForm = async () => {
    if (isSubmitting) {
      console.log('이미 제출 중입니다.');
      return;
    }

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

    // 카테고리 ID 검증으로 변경
    if (!selectedCategoryId) {
      alert('1차 및 2차 카테고리를 모두 선택해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // 이미지가 있으면 업로드 시도
      if (imageFile) {
        try {
          console.log('이미지 업로드 시작...');
          imageUrl = await uploadImage(imageFile);
          console.log('이미지 업로드 완료:', imageUrl);
        } catch (imageError) {
          console.error('이미지 업로드 실패, 이미지 없이 상품 등록 진행:', imageError);
          imageUrl = null;
        }
      }

      // 상품 데이터 준비 (백엔드 요구사항에 맞게 수정)
      const productData = {
        name: name.trim(),
        description: `${name.trim()} 상품입니다.`,
        sales_link: link.trim(), // 실제 링크 사용
        price: parseInt(price.replace(/,/g, '')),
        ...(imageUrl ? { image_urls: imageUrl } : {}),
        category_id: selectedCategoryId, // 🆕 카테고리 ID 사용 (category_type, category_name 대신)
        tag_input: tags.join(','), // 쉼표로 구분된 문자열로 변환 (tags 배열 대신)
      };

      console.log('상품 저장 요청 데이터 (백엔드 요구사항 반영):', productData);

      console.log('=== 백엔드 요구사항 디버깅 ===');
      console.log('카테고리 ID:', selectedCategoryId);
      console.log('태그 입력 형식:', productData.tag_input);
      console.log('판매 링크:', productData.sales_link);

      // API 호출
      const result = await createPost(productData);
      console.log('API 응답:', result);
      console.log('응답 데이터 전체:', JSON.stringify(result, null, 2));
      
      alert('상품이 등록되었습니다!');

      // 폼 초기화
      resetForm();
    } catch (error) {
      console.error('상품 등록 실패:', error);

      // 더 자세한 에러 정보 표시
      if (error.response) {
        console.error('API 에러 응답:', error.response.data);
        alert(`상품 등록에 실패했습니다: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        console.error('네트워크 에러:', error.request);
        alert('네트워크 연결을 확인해주세요.');
      } else {
        alert(`상품 등록에 실패했습니다: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 폼 제출 처리 (폼 이벤트용)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSubmitForm();
  };

  // 폼 초기화 (수정)
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

  // 헤더 액션 등록/해제 (의존성 배열에 selectedCategoryId 추가)
  useEffect(() => {
    console.log('Product 컴포넌트: saveProfile 액션 등록');

    const saveAction = () => {
      console.log('헤더에서 상품 등록 실행');
      handleSubmitForm();
    };

    registerAction('saveProfile', saveAction);

    return () => {
      console.log('Product 컴포넌트: saveProfile 액션 해제');
      unregisterAction('saveProfile');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, price, link, businessType, businessName, imageFile, tags, selectedCategoryId]); 

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
            <Camera color="#fff" size={22} />
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

      {/* 1차 카테고리 */}
      <Styled.InputGroup>
        <Styled.Label htmlFor="business-type">1차 카테고리</Styled.Label>
        <Styled.Select id="business-type" value={businessType} onChange={handleBusinessTypeChange}>
          <option value="">카테고리를 선택해주세요</option>
          {(() => {
            const uniqueTypes = [...new Set(categories.map(cat => cat.category_type))];
            console.log('렌더링할 1차 카테고리들:', uniqueTypes);
            return uniqueTypes.map((categoryType) => (
              <option key={categoryType} value={categoryType}>
                {categoryType}
              </option>
            ));
          })()}
        </Styled.Select>
      </Styled.InputGroup>

      {/* 2차 카테고리 */}
      <Styled.InputGroup>
        <Styled.Label htmlFor="business-name">2차 카테고리</Styled.Label>
        <Styled.Select
          id="business-name"
          value={businessName}
          onChange={handleBusinessNameChange}
          disabled={!businessType}
        >
          <option value="">세부 카테고리를 선택해주세요</option>
          {(() => {
            console.log('렌더링할 2차 카테고리들:', secondaryCategories);
            return secondaryCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ));
          })()}
        </Styled.Select>
      </Styled.InputGroup>

      {/* 태그 */}
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