import * as Styled from './JoinProducer.style';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const JoinProducer = () => {

  const [postalCode] = useState('');
  const [address] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [businessType, setBusinessType] = useState("");
  const handleFileClear = () => {
    const fileInput = document.getElementById("business-file");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleOpenPostcodeAPI = () => {
    // 주소 API 열기 로직 작성
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };

  return (
  <Styled.Form>

    <Styled.H2>생산자 회원가입</Styled.H2>

    <Styled.InputGroup>
      <Styled.Label htmlFor="email">이메일</Styled.Label>
      <Styled.InputEmail id="email" type="email" placeholder="이메일 주소를 입력해주세요" />
    </Styled.InputGroup>
    
    <Styled.InputGroup>
      <Styled.Label htmlFor="password">비밀번호</Styled.Label>
      <Styled.InputPassword id="password" type="password" placeholder="비밀번호를 설정해 주세요" />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="re-password">비밀번호 확인</Styled.Label>
      <Styled.InputRePassword id="re-password" type="password" placeholder="한번 더 입력해주세요" />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="name">대표자 실명</Styled.Label>
      <Styled.InputName id="name" type="name" placeholder="사업자 등록증 내용과 동일하게 작성해주세요" />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="number">연락처</Styled.Label>
      <Styled.InputNumber id="number" type="text" placeholder="01071470779" />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="business-number">사업자 번호</Styled.Label>
      <Styled.InputBusiness id="business-number" type="text" placeholder="사업자 등록증 내용과 동일하게 작성해주세요" />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="postal-code">사업장 소재지</Styled.Label>

      <Styled.InputWrapper>
        <Styled.InputPoscal
          id="postalCode"
          type="text"
          value={postalCode}
          readOnly
          onClick={handleOpenPostcodeAPI}
          placeholder="우편번호"
        />

          <Styled.AddressButton type="button" 
          onClick={handleOpenPostcodeAPI}>주소 찾기
          </Styled.AddressButton>

        </Styled.InputWrapper>

        <Styled.FlexRow>
          <Styled.Input
            id="address"
            type="text"
            value={address}
            readOnly
            onClick={handleOpenPostcodeAPI}
            placeholder="주소"
          />

          <Styled.Input
            id="detailAddress"
            type="text"
            value={detailAddress}
            onChange={handleDetailAddressChange}
            placeholder="상세주소"
          />
        </Styled.FlexRow>
    </Styled.InputGroup>

    <Styled.Select
      id="business-type"
      value={businessType}
      onChange={(e) => setBusinessType(e.target.value)}
    >
      <option value="">업태를 선택해주세요</option>
      <option value="retail">농업·임업</option>
      <option value="wholesale">어업·양식업</option>
    </Styled.Select>

    <Styled.InputGroup>
    <Styled.Label htmlFor="business-file">사업자 등록증 업로드</Styled.Label>

    <Styled.FileInputWrapper>
      <Styled.FileInput id="business-file" type="file" />
      <Styled.FileButton type="button" onClick={handleFileClear}>
        삭제
      </Styled.FileButton>
    </Styled.FileInputWrapper>

    </Styled.InputGroup>


    <Styled.Button type="submit">다음</Styled.Button>

    <Link to="/join-membership">
      <Styled.Signup>일반 회원 가입하기</Styled.Signup>
    </Link>

  </Styled.Form> 

  );


};

export default JoinProducer;