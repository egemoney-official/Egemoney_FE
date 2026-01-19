import { Outlet } from 'react-router-dom';
import { LogoutHandler } from '@/components/LogoutHandler';

/**
 * 앱의 최상위 레이아웃 컴포넌트
 * Router 내부에서 로그아웃 이벤트를 처리합니다.
 */
const App = () => {
  return (
    <>
      <LogoutHandler />
      <Outlet />
    </>
  );
};

export default App;
