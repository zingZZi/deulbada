// hooks/useProfileRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useProfileRedirect = (accountId) => {
  const navigate = useNavigate();
  useEffect(() => {
    const currentAccountId = localStorage.getItem('account_id');
    if (currentAccountId && accountId === currentAccountId) {
      navigate('/myprofile', { replace: true }); // replace: true로 히스토리 교체
    }
  }, [accountId, navigate]);
};

export default useProfileRedirect;
