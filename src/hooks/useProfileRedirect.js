// hooks/useProfileRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useProfileRedirect = (username) => {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUserName = localStorage.getItem('user_name');
    console.log(currentUserName);
    // 현재 로그인한 사용자의 프로필을 접근하는 경우
    if (currentUserName && username === currentUserName) {
      navigate('/myprofile', { replace: true }); // replace: true로 히스토리 교체
    }
  }, [username, navigate]);
};

export default useProfileRedirect;
