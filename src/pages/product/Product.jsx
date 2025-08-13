import * as Styled from './product.style';
import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { createPost } from "../../api/productApi";
import { usePageActions } from '../../context/PageActionsContext';

const Product = () => {
  const { registerAction, unregisterAction } = usePageActions(); // 액션 등록/해제 함수
  
  // 상태 관리
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [businessType, setBusinessType] = useState(''); // 1차 카테고리 (농산물/수산물)
  const [businessName, setBusinessName] = useState(''); // 2차 카테고리 (세부 분류)
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태

  // 카테고리 데이터
  const categories = {
    농산물: [
      '잎채소류',
      '열매채소류', 
      '뿌리채소류',
      '과일류',
      '곡류·잡곡',
      '버섯류',
      '견과류',
      '기타농산물'
    ],
    수산물: [
      '생선류',
      '갑각류',
      '조개류',
      '연체류',
      '건어물류',
      '젓갈류',
      '어패가공품',
      '기타수산물'
    ]
  };

  // 1차 카테고리 변경 시 2차 카테고리 초기화
  const handleBusinessTypeChange = (e) => {
    setBusinessType(e.target.value);
    setBusinessName(''); // 2차 카테고리 초기화
  };

  // 이미지 업로드 함수
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 백엔드 이미지 업로드 엔드포인트
      const response = await fetch('http://43.201.70.73/api/uploads/images/', {
        method: 'POST',
        body: formData,
        // 인증 헤더는 api.js에서 전역 설정되어 있다면 여기서는 제외
        // headers: {
        //   'Authorization': `Bearer ${token}` // 필요 시 추가
        // }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('이미지 업로드 응답:', result);
      return result.imageUrl || result.url || result.file_url; // 백엔드 응답 구조에 맞게 조정
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    }
  };

  // 폼 제출 처리 함수 (헤더 버튼과 폼 제출에서 공통 사용)
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
    
    if (!businessType) {
      alert('1차 카테고리를 선택해 주세요.');
      return;
    }

    if (!businessName) {
      alert('2차 카테고리를 선택해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // 이미지가 있으면 먼저 업로드
      if (imageFile) {
        console.log('이미지 업로드 시작...');
        imageUrl = await uploadImage(imageFile);
        console.log('이미지 업로드 완료:', imageUrl);
      }

      // 상품 데이터 준비 (백엔드 스펙 추정)
      const productData = {
        name: name.trim(), // 상품명
        price: parseInt(price.replace(/,/g, '')), // 가격 (숫자)
        description: link.trim(), // 설명 (판매링크)
        image_urls: imageUrl ? [imageUrl] : [], // 이미지 URL 배열
        tags: tags, // 태그 배열
        category_type: businessType, // 1차 카테고리 (농산물/수산물)
        category_name: businessName, // 2차 카테고리 (잎채소류 등)
        // 또는 백엔드가 다른 필드명을 원한다면:
        // type: businessType,
        // category: businessName,
      };

      console.log('상품 저장 요청 데이터:', productData);
      
      // API 호출
      const result = await createPost(productData);
      console.log('API 응답:', result);
      
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

  // 폼 초기화
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

  // 헤더 액션 등록/해제
  useEffect(() => {
    console.log('Product 컴포넌트: saveProfile 액션 등록');
    
    // saveProfile 액션 등록 - 현재 state를 참조하는 함수로 래핑
    const saveAction = () => {
      console.log('헤더에서 상품 등록 실행');
      handleSubmitForm();
    };
    
    registerAction('saveProfile', saveAction);

    // 컴포넌트 언마운트 시 액션 해제
    return () => {
      console.log('Product 컴포넌트: saveProfile 액션 해제');
      unregisterAction('saveProfile');
    };
  }, [name, price, link, businessType, businessName, imageFile, tags]); // state 변경시 재등록

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

      {/* 1차 카테고리 */}
      <Styled.InputGroup>
        <Styled.Label htmlFor="business-type">1차 카테고리</Styled.Label>
        <Styled.Select
          id="business-type"
          value={businessType}
          onChange={handleBusinessTypeChange}
        >
          <option value="">카테고리를 선택해주세요</option>
          <option value="농산물">농산물</option>
          <option value="수산물">수산물</option>
        </Styled.Select>
      </Styled.InputGroup>

      {/* 2차 카테고리 */}
      {businessType && (
        <Styled.InputGroup>
          <Styled.Label htmlFor="business-name">2차 카테고리</Styled.Label>
          <Styled.Select
            id="business-name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          >
            <option value="">세부 카테고리를 선택해주세요</option>
            {categories[businessType]?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Styled.Select>
        </Styled.InputGroup>
      )}

      <Styled.Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '등록 중...' : '상품 등록'}
      </Styled.Button>

    </Styled.Form>
  );
};

export default Product;