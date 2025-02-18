import './App.css'
import {
  Routes, 
  Route, 
  Link, 
  Navigate,
  useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import Notfound from './pages/NotFound'
import {getEmotionImage} from './util/get-emotion-image'

// 1. "/" : 모든 일기를 조회하는 home 페이지
// 2. "/new" : 새 일기를 작성하는 페이지
// 3. "/diary" : 일기를 조회하는 페이지

// a태그를 이용한면 클라이언트 사이드 렌더링이 아닌 서버 사이드 렌더링이 되어 페이지가 새로고침됨
function App() {
  const nav = useNavigate()

  const onClick = () => {
    return nav("/new")
  }


  // 이미지를 assets 폴더에 넣어서 사용하면 vite에서 자동으로 최적화해서 처리함(캐싱)
  // 이미지의 수가 많으면 public 폴더도 이용
  return (
    <>
    <div>
      <img src={getEmotionImage(1)} alt="emotion1" />
      <img src={getEmotionImage(2)} alt="emotion2" />
      <img src={getEmotionImage(3)} alt="emotion3" />
      <img src={getEmotionImage(4)} alt="emotion4" />
      <img src={getEmotionImage(5)} alt="emotion5" />
    </div>

    <div>
      <Link to="/">Home</Link>
      <Link to="/new">New</Link>
      <Link to="/diary">Diary</Link>
    </div>
    <button onClick={onClick}>New</button>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/diary/:id" element={<Diary />} />
      <Route path="*" element={<Notfound/>} /> 
    </Routes>
  </>
  );
}

export default App