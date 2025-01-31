import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/auth/Login';

// 여기에 사용하는 모든 페이지 임포트 후, 라우트 배열을 정의
// 필요한 라우트만 이곳에 추가해주면 됩니다.
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;