import './App.css'
import {useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import Notfound from './pages/NotFound'
import Edit from './pages/Edit'
import Loading from './Lottie/Loading'
import useDiaryStore from './store/Diary'

// 1. "/" : 모든 일기를 조회하는 home 페이지
// 2. "/new" : 새 일기를 작성하는 페이지
// 3. "/diary" : 일기를 조회하는 페이지

function App() {
  const { isLoading, init, setLoading } = useDiaryStore();

  useEffect(() => {
    const storedData = localStorage.getItem('diary');
    if(!storedData){
      setLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if(!Array.isArray(parsedData)){
      setLoading(false);
      return;
    }

    init(parsedData);
  }, []);

  if(isLoading){
    return <Loading />
  }

  // 이미지를 assets 폴더에 넣어서 사용하면 vite에서 자동으로 최적화해서 처리함(캐싱)
  // 이미지의 수가 많으면 public 폴더도 이용
  // a태그를 이용한면 클라이언트 사이드 렌더링이 아닌 서버 사이드 렌더링이 되어 페이지가 새로고침됨
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/diary/:id" element={<Diary />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="*" element={<Notfound/>} /> 
    </Routes>
  );
}

export default App