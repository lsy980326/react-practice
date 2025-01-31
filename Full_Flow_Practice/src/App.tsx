import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { usePopup } from './context/PopupContext';
import Popup from './components/common/Popup';
import PopupSample from './pages/popup/PopupSample';
import './App.css';

function App() {
  const { openPopup } = usePopup();

  useEffect(() => {
    openPopup(<PopupSample />); // 팝업 실행 (개발 모드에선 StrictMode로 두 번 호출될 수 있음)
  }, [openPopup]);

  return (
    <>
      <RouterProvider router={router} />
      <Popup />
    </>
  );
}

export default App;
