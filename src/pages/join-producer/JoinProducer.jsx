import * as Styled from './JoinProducer.style';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const JoinProducer = () => {

  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [businessType, setBusinessType] = useState("");

  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      console.log('선택된 파일:', file);
    }
  };

  useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
  }, []);

  const handleOpenPostcodeAPI = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname) extraAddress += data.bname;
          if (data.buildingName)
            extraAddress += (extraAddress ? ', ' + data.buildingName : data.buildingName);
          fullAddress += extraAddress ? ` (${extraAddress})` : '';
        }

        setPostalCode(data.zonecode);   
        setAddress(fullAddress);          
      },
    }).open();
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
      <Styled.FileName hasFile={!!fileName}>
        {fileName || '파일이 선택되지 않았습니다'}
      </Styled.FileName>

      <label htmlFor="file-upload">
        <Styled.CustomFileButton as="span">파일 선택</Styled.CustomFileButton>
      </label>

      <input
        id="file-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Styled.FileInputWrapper>

    {/* 줄바꿈을 유발하지 않는 위치로 분리 */}
    {fileName && (
      <Styled.FileNameNotice></Styled.FileNameNotice>
    )}

    </Styled.InputGroup>


    <Styled.Button type="submit">다음</Styled.Button>

    <Link to="/join-membership">
      <Styled.Signup>일반 회원 가입하기</Styled.Signup>
    </Link>

  </Styled.Form> 

  );


};

export default JoinProducer;