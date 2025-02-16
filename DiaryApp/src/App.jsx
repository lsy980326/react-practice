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

// 1. "/" : 모든 일기를 조회하는 home 페이지
// 2. "/new" : 새 일기를 작성하는 페이지
// 3. "/diary" : 일기를 조회하는 페이지

// a태그를 이용한면 클라이언트 사이드 렌더링이 아닌 서버 사이드 렌더링이 되어 페이지가 새로고침됨
function App() {
  const nav = useNavigate()

  const onClick = () => {
    return nav("/new")
  }


  return (
    <>
    <div>
      <Link to="/">Home</Link>
      <Link to="/new">New</Link>
      <Link to="/diary">Diary</Link>
    </div>
    <button onClick={onClick}>New</button>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="*" element={<Notfound/>} /> 
    </Routes>
  </>
  );
}

export default App