import * as Styled from './JoinProducer.style';
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerProducer, isEmailAvailable, isAccountIdAvailable } from '../../api/authApi';
import { login } from '../../auth/authService';
import { setAccountId } from '../../auth/tokenStore';

const JoinProducer = () => {
  const [formData, setFormData] = useState({
    account_id: '',
    username: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [ceoName, setCeoName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [fileName, setFileName] = useState('');

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [accountIdStatus, setAccountIdStatus] = useState(null);
  const [usernameStatus, setUsernameStatus] = useState(null);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (!password) return '비밀번호를 입력해주세요.';
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

    if (!isLengthValid || !hasLetter || !hasNumber || !hasSpecial) {
      return '영문자, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.';
    }
    return null;
  };

  const validatePasswordConfirmation = (password, rePassword) => {
    if (!rePassword) return '비밀번호 확인을 입력해주세요.';
    if (password !== rePassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  };

  const isFormValid = useMemo(() => {
    const isBasicFieldsFilled = 
      formData.email.trim() &&
      formData.password.trim() &&
      formData.rePassword.trim() &&
      formData.account_id.trim() &&
      formData.username.trim();

    const isProducerFieldsFilled = 
      ceoName.trim() &&
      phone.trim() &&
      businessNumber.trim() &&
      postalCode &&
      address.trim() &&
      businessType;

    if (!isBasicFieldsFilled || !isProducerFieldsFilled) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isAccountIdValid = formData.account_id.length >= 2;
    const isUsernameValid = formData.username.length >= 2;
    const isPhoneValid = /^01[0-9]-\d{3,4}-\d{4}$/.test(phone);
    const isBusinessNumberValid = /^\d{3}-\d{2}-\d{5}$/.test(businessNumber);

    const isDuplicateCheckPassed = 
      emailStatus === 'available' &&
      accountIdStatus === 'available' &&
      usernameStatus === 'available';

    const isNotChecking = 
      emailStatus !== 'checking' &&
      accountIdStatus !== 'checking' &&
      usernameStatus !== 'checking';

    return (
      isEmailValid &&
      isAccountIdValid &&
      isUsernameValid &&
      isPhoneValid &&
      isBusinessNumberValid &&
      isDuplicateCheckPassed &&
      isNotChecking
    );
  }, [
    formData,
    ceoName,
    phone,
    businessNumber,
    postalCode,
    address,
    businessType,
    emailStatus,
    accountIdStatus,
    usernameStatus
  ]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkUsername = async (username) => {
    if (!username || username.length < 2) return;

    setUsernameStatus('checking');

    try {
      const available = await isAccountIdAvailable(username);
      setUsernameStatus(available ? 'available' : 'taken');

      if (!available) {
        setErrors(prev => ({ ...prev, username: '이미 사용중인 닉네임입니다.' }));
      } else {
        setErrors(prev => ({ ...prev, username: '' }));
      }
    } catch (error) {
      console.error('닉네임 확인 실패:', error);
      setUsernameStatus(null);
    }
  };

  const checkAccountId = async (accountId) => {
    if (!accountId || accountId.length < 2) return;

    setAccountIdStatus('checking');

    try {
      const available = await isAccountIdAvailable(accountId);
      setAccountIdStatus(available ? 'available' : 'taken');

      if (!available) {
        setErrors(prev => ({ ...prev, account_id: '이미 사용중인 계정ID입니다.' }));
      } else {
        setErrors(prev => ({ ...prev, account_id: '' }));
      }
    } catch (error) {
      console.error('계정ID 확인 실패:', error);
      setAccountIdStatus(null);
    }
  };

  const checkEmail = async (email) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setEmailStatus('checking');

    try {
      const available = await isEmailAvailable(email);
      setEmailStatus(available ? 'available' : 'taken');

      if (!available) {
        setErrors(prev => ({ ...prev, email: '이미 사용중인 이메일입니다.' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } catch (error) {
      console.error('이메일 확인 실패:', error);
      setEmailStatus(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePasswordChange = (value) => {
    setFormData(prev => ({ ...prev, password: value }));
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.password;
      delete newErrors.rePassword;
      return newErrors;
    });
  };

  const handlePasswordConfirmChange = (value) => {
    setFormData(prev => ({ ...prev, rePassword: value }));
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.rePassword;
      return newErrors;
    });
  };

  const handleAccountIdChange = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z0-9._-]/g, '');

    setFormData(prev => ({ ...prev, account_id: filteredValue }));

    if (errors.account_id) {
      setErrors(prev => ({ ...prev, account_id: '' }));
    }

    if (accountIdStatus === 'available') {
      setAccountIdStatus(null);
    }

    clearTimeout(window.accountIdCheckTimer);
    if (filteredValue.length >= 2) {
      window.accountIdCheckTimer = setTimeout(() => {
        checkAccountId(filteredValue);
      }, 500);
    }
  };

  const handleUsernameChange = (value) => {
    const filteredValue = value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ0-9]/g, '');

    setFormData(prev => ({ ...prev, username: filteredValue }));

    if (errors.username) {
      setErrors(prev => ({ ...prev, username: '' }));
    }

    if (usernameStatus === 'available') {
      setUsernameStatus(null);
    }

    clearTimeout(window.usernameCheckTimer);
    if (filteredValue.length >= 2) {
      window.usernameCheckTimer = setTimeout(() => {
        checkUsername(filteredValue);
      }, 500);
    }
  };

  const handleEmailChange = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z0-9@._+-]/g, '');

    handleInputChange('email', filteredValue);

    if (emailStatus === 'available') {
      setEmailStatus(null);
    }

    clearTimeout(window.emailCheckTimer);
    window.emailCheckTimer = setTimeout(() => {
      checkEmail(filteredValue);
    }, 500);
  };

  const handlePhoneChange = (value) => {
    const filteredValue = value.replace(/[^0-9]/g, '');
    let formattedValue = filteredValue;

    if (filteredValue.length >= 11) {
      formattedValue = filteredValue.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
    } else if (filteredValue.length >= 7) {
      formattedValue = filteredValue.replace(/^(\d{3})(\d{3,4})(\d{0,4})$/, '$1-$2-$3');
    } else if (filteredValue.length >= 3) {
      formattedValue = filteredValue.replace(/^(\d{3})(\d{0,4})$/, '$1-$2');
    }

    setPhone(formattedValue);

    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleBusinessNumberChange = (value) => {
    const filteredValue = value.replace(/[^0-9]/g, '');
    let formattedValue = filteredValue;

    if (filteredValue.length >= 10) {
      formattedValue = filteredValue.replace(/^(\d{3})(\d{2})(\d{5})$/, '$1-$2-$3');
    } else if (filteredValue.length >= 5) {
      formattedValue = filteredValue.replace(/^(\d{3})(\d{2})(\d{0,5})$/, '$1-$2-$3');
    } else if (filteredValue.length >= 3) {
      formattedValue = filteredValue.replace(/^(\d{3})(\d{0,2})$/, '$1-$2');
    }

    setBusinessNumber(formattedValue);

    if (errors.businessNumber) {
      setErrors(prev => ({ ...prev, businessNumber: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleOpenPostcodeAPI = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname) extraAddress += data.bname;
          if (data.buildingName)
            extraAddress += extraAddress ? ', ' + data.buildingName : data.buildingName;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    const newErrors = {};

    if (!formData.account_id.trim()) {
      newErrors.account_id = '계정ID를 입력해주세요.';
    } else if (formData.account_id.length < 2) {
      newErrors.account_id = '계정ID는 2자 이상이어야 합니다.';
    } else if (accountIdStatus === 'taken') {
      newErrors.account_id = '이미 사용중인 계정ID입니다.';
    } else if (accountIdStatus !== 'available') {
      newErrors.account_id = '계정ID 중복 확인을 완료해주세요.';
    }

    if (!formData.username.trim()) {
      newErrors.username = '닉네임을 입력해주세요.';
    } else if (formData.username.length < 2) {
      newErrors.username = '닉네임은 2자 이상이어야 합니다.';
    } else if (usernameStatus === 'taken') {
      newErrors.username = '이미 사용중인 닉네임입니다.';
    } else if (usernameStatus !== 'available') {
      newErrors.username = '닉네임 중복 확인을 완료해주세요.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 주소를 입력해주세요.';
    } else if (emailStatus === 'taken') {
      newErrors.email = '이미 사용중인 이메일입니다.';
    } else if (emailStatus !== 'available') {
      newErrors.email = '이메일 중복 확인을 완료해주세요.';
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    const passwordConfirmError = validatePasswordConfirmation(formData.password, formData.rePassword);
    if (passwordConfirmError) {
      newErrors.rePassword = passwordConfirmError;
    }

    if (!ceoName.trim()) {
      newErrors.ceoName = '대표자명을 입력해주세요.';
    }

    if (!phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.';
    } else if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(phone)) {
      newErrors.phone = '올바른 전화번호 형식이 아닙니다.';
    }

    if (!businessNumber.trim()) {
      newErrors.businessNumber = '사업자번호를 입력해주세요.';
    } else if (!/^\d{3}-\d{2}-\d{5}$/.test(businessNumber)) {
      newErrors.businessNumber = '올바른 사업자번호 형식이 아닙니다.';
    }

    if (!postalCode) {
      newErrors.address = '주소를 입력해주세요.';
    }

    if (!businessType) {
      newErrors.businessType = '업태를 선택해주세요.';
    }

    if (
      emailStatus === 'checking' ||
      accountIdStatus === 'checking' ||
      usernameStatus === 'checking'
    ) {
      newErrors.general = '중복 확인을 완료해주세요.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const fullAddress = detailAddress ? `${address} ${detailAddress}` : address;

      await registerProducer({
        account_id: formData.account_id,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        ceo_name: ceoName,
        phone: phone,
        business_number: businessNumber.replace(/-/g, ''),
        address_postcode: postalCode,
        address_line1: fullAddress,
      });

      setAccountId(formData.account_id);
      
      await login(formData.email, formData.password);

      alert('프로듀서 회원가입이 완료되었습니다!');
      
      navigate('/profileSettings', {
        state: {
          account_id: formData.account_id,
          username: formData.username,
          isFromProducerSignup: true
        }
      });
    } catch (error) {
      console.error('프로듀서 회원가입 실패:', error);
      setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.H2>생산자 회원가입</Styled.H2>

      <Styled.InputGroup>
        <Styled.Label htmlFor="email">이메일</Styled.Label>
        <Styled.InputEmail
          id="email"
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          value={formData.email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        {emailStatus === 'available' && (
          <div style={{ fontSize: '12px', marginTop: '4px', color: 'green' }}>
            ✓ 사용 가능한 이메일입니다
          </div>
        )}
        {errors.email && <Styled.Error>{errors.email}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="password">비밀번호</Styled.Label>
        <Styled.InputPassword
          id="password"
          type="password"
          placeholder="영문자, 숫자, 특수문자를 포함해 8자 이상"
          value={formData.password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        {errors.password && <Styled.Error>{errors.password}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="re-password">비밀번호 확인</Styled.Label>
        <Styled.InputRePassword
          id="re-password"
          type="password"
          placeholder="한번 더 입력해주세요"
          value={formData.rePassword}
          onChange={(e) => handlePasswordConfirmChange(e.target.value)}
        />
        {errors.rePassword && <Styled.Error>{errors.rePassword}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="account_id">계정ID</Styled.Label>
        <Styled.InputEmail
          id="account_id"
          type="text"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          value={formData.account_id}
          onChange={(e) => handleAccountIdChange(e.target.value)}
        />
        {accountIdStatus === 'available' && (
          <div style={{ fontSize: '12px', marginTop: '4px', color: 'green' }}>
            ✓ 사용 가능한 계정ID입니다
          </div>
        )}
        {errors.account_id && <Styled.Error>{errors.account_id}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="username">사용자 이름</Styled.Label>
        <Styled.InputEmail
          id="username"
          type="text"
          placeholder="한글과 숫자만 입력 가능합니다"
          value={formData.username}
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
        {usernameStatus === 'available' && (
          <div style={{ fontSize: '12px', marginTop: '4px', color: 'green' }}>
            ✓ 사용 가능한 사용자 이름입니다
          </div>
        )}
        {errors.username && <Styled.Error>{errors.username}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="name">대표자 실명</Styled.Label>
        <Styled.InputName
          id="name"
          type="text"
          placeholder="사업자 등록증 내용과 동일하게 작성해주세요"
          value={ceoName}
          onChange={(e) => setCeoName(e.target.value)}
        />
        {errors.ceoName && <Styled.Error>{errors.ceoName}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="number">연락처</Styled.Label>
        <Styled.InputNumber
          id="number"
          type="text"
          placeholder="010-1234-5678"
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
        />
        {errors.phone && <Styled.Error>{errors.phone}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="business-number">사업자 번호</Styled.Label>
        <Styled.InputBusiness
          id="business-number"
          type="text"
          placeholder="123-45-67890"
          value={businessNumber}
          onChange={(e) => handleBusinessNumberChange(e.target.value)}
        />
        {errors.businessNumber && <Styled.Error>{errors.businessNumber}</Styled.Error>}
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
          <Styled.AddressButton type="button" onClick={handleOpenPostcodeAPI}>
            주소 찾기
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
        {errors.address && <Styled.Error>{errors.address}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.Select
        id="business-type"
        value={businessType}
        onChange={(e) => setBusinessType(e.target.value)}
      >
        <option value="">업태를 선택해주세요</option>
        <option value="농업·임업">농업·임업</option>
        <option value="어업·양식업">어업·양식업</option>
      </Styled.Select>
      {errors.businessType && <Styled.Error>{errors.businessType}</Styled.Error>}

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
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </Styled.FileInputWrapper>

        {fileName && <Styled.FileNameNotice></Styled.FileNameNotice>}
      </Styled.InputGroup>

      {errors.general && <Styled.Error>{errors.general}</Styled.Error>}

      <Styled.Button 
        type="submit" 
        disabled={isLoading || !isFormValid}
        $isActive={isFormValid}
      >
        {isLoading ? '가입 중...' : '다음'}
      </Styled.Button>

      <Link to="/joinMembership">
        <Styled.Signup>일반 회원 가입하기</Styled.Signup>
      </Link>
    </Styled.Form>
  );
};

export default JoinProducer;