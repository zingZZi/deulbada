/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { usePageActions } from '../../context/PageActionsContext';

const MyProfileEdit = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    profileImage: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ref를 사용해서 최신 profileData에 접근
  const profileDataRef = useRef(profileData);
  profileDataRef.current = profileData;

  // Context 사용 시 에러 처리
  let registerAction, unregisterAction;
  try {
    const pageActionsContext = usePageActions();
    registerAction = pageActionsContext.registerAction;
    unregisterAction = pageActionsContext.unregisterAction;
  } catch (error) {
    console.warn('PageActionsProvider not found in MyProfile');
    registerAction = () => {};
    unregisterAction = () => {};
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 실제 프로필 저장 로직 - useCallback으로 메모이제이션하지 않음
  const saveProfileData = async (e) => {
    try {
      setIsSaving(true);
      console.log('MyProfile saveProfileData 실행됨');

      const currentData = profileDataRef.current;

      // 유효성 검사
      if (!currentData.name.trim()) {
        alert('이름을 입력해주세요.');
        return;
      }

      if (!currentData.email.trim()) {
        alert('이메일을 입력해주세요.');
        return;
      }

      console.log('저장할 프로필 데이터:', currentData);

      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('프로필 저장 성공');
      alert('프로필이 저장되었습니다.');
    } catch (error) {
      console.error('저장 중 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 프로필 데이터 로드
  const loadProfileData = async () => {
    try {
      setIsLoading(true);

      // 더미 데이터 로드
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProfileData({
        name: '홍길동',
        email: 'hong@example.com',
        bio: '안녕하세요!',
        profileImage: '',
      });
    } catch (error) {
      console.error('프로필 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시에만 실행
  useEffect(() => {
    console.log('MyProfile 컴포넌트 마운트됨');

    // 액션 등록 (한 번만)
    registerAction('saveProfile', saveProfileData);

    // 데이터 로드
    loadProfileData();

    // 클린업
    return () => {
      console.log('MyProfile 컴포넌트 언마운트됨');
      unregisterAction('saveProfile');
    };
  }, []); // 빈 의존성 배열

  if (isLoading) {
    return <div className="loading">프로필을 불러오는 중...</div>;
  }

  return (
    <div className="my-profile-page">
      <div className="profile-form">
        <h2>내 프로필 수정</h2>

        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={profileData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={isSaving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isSaving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">자기소개</label>
          <textarea
            id="bio"
            placeholder="자기소개를 입력하세요"
            value={profileData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            disabled={isSaving}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profileImage">프로필 이미지 URL</label>
          <input
            id="profileImage"
            type="url"
            placeholder="프로필 이미지 URL을 입력하세요"
            value={profileData.profileImage}
            onChange={(e) => handleInputChange('profileImage', e.target.value)}
            disabled={isSaving}
          />
        </div>

        {isSaving && <p className="saving-message">저장 중...</p>}
      </div>
    </div>
  );
};

export default MyProfileEdit;
