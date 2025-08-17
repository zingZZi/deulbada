import * as Styled from './MyPrifleEdit.style';
import React, { useEffect, useState } from 'react';
import { CameraIcon } from '../../components/icon/Icons';
import ImagePreview from '../../assets/images/image-preview.png';
import { usePageActions } from '../../context/PageActionsContext';
import { fetchUser, editProfile, checkAccountId } from '../../api/userApi'; // checkAccountId 추가

const MyProfileEdit = () => {
  const [myData, setMyData] = useState();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 유효성 검사 상태
  const [nameError, setNameError] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [isCheckingUserId, setIsCheckingUserId] = useState(false);

  const useraccountId = window.localStorage.getItem('account_id');

  // 초기 data값 가져오기
  useEffect(() => {
    const getMyData = async () => {
      try {
        const response = await fetchUser(useraccountId);
        const data = response.data;
        setMyData(data);
        // 기존 이미지가 있다면 설정
        if (data.profile_image) {
          setImage(data.profile_image);
        }
      } catch (error) {
        console.error('내정보를 불러오지 못했습니다.', error);
        alert('프로필 정보를 불러오는데 실패했습니다.');
      }
    };
    getMyData();
  }, []);

  // myData가 업데이트될 때마다 form state도 업데이트
  useEffect(() => {
    if (myData) {
      setName(myData.username || '');
      setUserId(myData.account_id || '');
      setInfo(myData.introduction || '');
    }
  }, [myData]);

  const { registerAction } = usePageActions();

  // 사용자 이름 유효성 검사
  const validateName = (value) => {
    // 한글 정규식 (완성형 한글 + 자음/모음 조합)
    const koreanRegex = /^[가-힣]+$/;

    if (!koreanRegex.test(value)) {
      return '사용자 이름은 한글만 입력 가능합니다.';
    }
    if (value.length < 2) {
      return '사용자 이름은 2자 이상이어야 합니다.';
    }
    if (value.length > 10) {
      return '사용자 이름은 10자 이하여야 합니다.';
    }
    return '';
  };

  // 계정 ID 유효성 검사 (정규식)
  const validateUserId = (value) => {
    const regex = /^[a-zA-Z0-9._]+$/;
    if (!regex.test(value)) {
      return '영문, 숫자, 특수문자(.), (_)만 사용 가능합니다.';
    }
    if (value.length < 3) {
      return '계정 ID는 3자 이상이어야 합니다.';
    }
    if (value.length > 20) {
      return '계정 ID는 20자 이하여야 합니다.';
    }
    return '';
  };

  // 계정 ID 중복 체크 (디바운싱 적용)
  useEffect(() => {
    const checkUserIdAvailability = async () => {
      if (!userId || userId === myData?.account_id) {
        setUserIdError('');
        return;
      }

      const validationError = validateUserId(userId);
      if (validationError) {
        setUserIdError(validationError);
        return;
      }

      setIsCheckingUserId(true);

      try {
        const response = await checkAccountId(userId);
        if (response.data.exists) {
          setUserIdError('이미 사용중인 계정 ID입니다.');
        } else {
          setUserIdError('');
        }
      } catch (error) {
        console.error('계정 ID 중복 체크 실패:', error);
        setUserIdError('계정 ID 중복 확인에 실패했습니다.');
      } finally {
        setIsCheckingUserId(false);
      }
    };

    // 디바운싱: 500ms 후에 중복 체크 실행
    const timeoutId = setTimeout(checkUserIdAvailability, 500);

    return () => clearTimeout(timeoutId);
  }, [userId, myData?.account_id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }
      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
    // 입력 즉시 기본 유효성 검사
    const validationError = validateUserId(value);
    if (validationError) {
      setUserIdError(validationError);
    }
  };

  const EditProfile = async () => {
    if (isLoading || isCheckingUserId) return; // 중복 요청 방지

    // 최종 유효성 검사
    const currentNameError = validateName(name);
    const currentUserIdError = validateUserId(userId);

    setNameError(currentNameError);

    if (!userId || userId === myData?.account_id) {
      setUserIdError('');
    } else {
      setUserIdError(currentUserIdError);
    }

    if (currentNameError || (currentUserIdError && userId !== myData?.account_id)) {
      alert('입력 정보를 확인해주세요.');
      return;
    }

    // 중복 체크 에러가 있는 경우
    if (userIdError && userId !== myData?.account_id) {
      alert('계정 ID를 확인해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      // FormData 생성 (이미지 업로드를 위해)
      const formData = new FormData();

      // 변경된 데이터만 추가
      if (name !== myData?.username) {
        formData.append('username', name);
      }
      if (userId !== myData?.account_id) {
        formData.append('account_id', userId);
      }
      if (info !== myData?.introduction) {
        formData.append('introduction', info);
      }
      if (imageFile) {
        formData.append('profile_image', imageFile);
      }

      // 수정할 데이터가 없는 경우
      if (formData.entries().next().done) {
        alert('변경된 내용이 없습니다.');
        return;
      }

      const response = await editProfile(formData);

      if (response.status === 200 || response.status === 204) {
        alert('프로필이 성공적으로 수정되었습니다.');
        // 수정된 데이터로 상태 업데이트
        setMyData((prev) => ({
          ...prev,
          username: name,
          account_id: userId,
          introduction: info,
          profile_image: response.data?.profile_image || image,
        }));

        // localStorage의 account_id도 업데이트 (만약 변경되었다면)
        if (userId !== useraccountId) {
          window.localStorage.setItem('account_id', userId);
        }
      }
    } catch (error) {
      console.error('프로필 수정 실패:', error);

      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (errorData.account_id) {
          setUserIdError('이미 사용중인 계정 ID입니다.');
        } else if (errorData.username) {
          setNameError('사용자 이름을 확인해주세요.');
        } else {
          alert('입력 정보를 확인해주세요.');
        }
      } else if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (registerAction) {
      registerAction('editProfile', EditProfile);
    }
  }, [name, userId, info, imageFile, myData, isLoading, nameError, userIdError]);

  return (
    <Styled.Form
      onSubmit={(e) => {
        e.preventDefault();
        EditProfile();
      }}
    >
      <h2 className="text-ir">프로필설정</h2>
      <Styled.ImageWrapper>
        <Styled.ImagePreview
          src={
            image
              ? image.startsWith('blob:')
                ? image // 새로 선택한 이미지 (blob URL)
                : `${image}` // 서버 이미지
              : ImagePreview // 기본 이미지
          }
          alt="프로필 이미지"
        />
        <Styled.FileInputLabel htmlFor="profile-upload">
          <CameraIcon size={22} />
        </Styled.FileInputLabel>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </Styled.ImageWrapper>

      <Styled.InputGroup>
        <Styled.Label htmlFor="name">사용자 이름</Styled.Label>
        <Styled.Id
          id="name"
          type="text"
          placeholder="2~10자 이내여야 합니다."
          value={name}
          onChange={handleNameChange}
          disabled={isLoading}
          style={{ borderColor: nameError ? 'red' : '' }}
        />
        {nameError && <Styled.ErrorMessage>{nameError}</Styled.ErrorMessage>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="id">계정 ID</Styled.Label>
        <Styled.Id
          id="id"
          type="text"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          value={userId}
          onChange={handleUserIdChange}
          disabled={isLoading}
          style={{ borderColor: userIdError ? 'red' : '' }}
        />
        {isCheckingUserId && <Styled.CheckingMessage>중복 확인 중...</Styled.CheckingMessage>}
        {userIdError && <Styled.ErrorMessage>{userIdError}</Styled.ErrorMessage>}
        {!userIdError && !isCheckingUserId && userId && userId !== myData?.account_id && (
          <Styled.SuccessMessage>사용 가능한 계정 ID입니다.</Styled.SuccessMessage>
        )}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="info">소개</Styled.Label>
        <Styled.InputInfo
          id="info"
          type="text"
          placeholder="소개글을 작성해주세요!"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          disabled={isLoading}
        />
      </Styled.InputGroup>
    </Styled.Form>
  );
};

export default MyProfileEdit;
