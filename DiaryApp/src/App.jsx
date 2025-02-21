import './App.css'
import {useReducer,useRef,createContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import Notfound from './pages/NotFound'
import Edit from './pages/Edit'
// 1. "/" : 모든 일기를 조회하는 home 페이지
// 2. "/new" : 새 일기를 작성하는 페이지
// 3. "/diary" : 일기를 조회하는 페이지

const mockData = [
  // 테스트용 더미 데이터
  {
    id: 1,
    createdDate: new Date("2025-02-19").getTime(), // 날짜를 밀리초로 변환하여 저장
    emotionId:1,
    content:"1번 일기 내용"
  },
  {
    id: 2,
    createdDate: new Date("2025-02-18").getTime(),
    emotionId:2,
    content:"2번 일기 내용"
  },
  {
    id: 3,
    createdDate: new Date("2025-01-18").getTime(),
    emotionId:3,
    content:"3번 일기 내용"
  }
]


function reducer(state, action){
  switch(action.type){
    case "CREATE": return [action.data,...state] // 새 일기를 배열 맨 앞에 추가
    case "UPDATE": return state.map((item)=>  // id가 일치하는 일기 내용 수정
      String(item.id) === String(action.data.id)
      ? action.data
      : item
    )
    case "DELETE": return state.filter((item)=> // id가 일치하는 일기 삭제
       String(item.id) !== String(action.data.id))
  }
}

// 전역 상태 관리를 위한 Context 생성
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();


function App() {
  const [data, dispatch] = useReducer(reducer,mockData)
  const idRef = useRef(4)

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type:"CREATE",
      data:{
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    })
  }


  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    console.log("수정 전 데이터:", data);
    dispatch({
      type:"UPDATE",
      data:{
        id,
        createdDate,
        emotionId,
        content
      }
    })
    console.log("수정 후 데이터:", data);
  }

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type:"DELETE",
      data:{
        id
      }
    })
  }

  // 이미지를 assets 폴더에 넣어서 사용하면 vite에서 자동으로 최적화해서 처리함(캐싱)
  // 이미지의 수가 많으면 public 폴더도 이용
  // a태그를 이용한면 클라이언트 사이드 렌더링이 아닌 서버 사이드 렌더링이 되어 페이지가 새로고침됨
  return (
    <>
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="*" element={<Notfound/>} /> 
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  </>
  );
}

export default App