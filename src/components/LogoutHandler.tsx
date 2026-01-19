import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 로그아웃 이벤트를 감지하여 React Router의 navigate를 통해 페이지 이동
 * Router 내부에서만 동작하므로 RouterProvider 내부에 배치해야 합니다.
 */
export const LogoutHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogoutEvent = () => {
      navigate('/login', { replace: true });
    };

    window.addEventListener('app:logout', handleLogoutEvent);

    return () => {
      window.removeEventListener('app:logout', handleLogoutEvent);
    };
  }, [navigate]);

  return null;
};
