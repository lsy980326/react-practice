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
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId:1,
    content:"1번 일기 내용"
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId:2,
    content:"2번 일기 내용"
  }
]


function reducer(state, action){
  switch(action.type){
    case "CREATE": return [action.data,...state]
    case "UPDATE": return state.map((item)=> 
      String(item.id) === String(action.data.id)
      ? action.data
      : item
    )
    case "DELETE": return state.filter((item)=>
       String(item.id) !== String(action.data.id))
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer,mockData)
  const idRef = useRef(3)

  // 새로운 일기 추가
  const onCrate = (createdDate, emotionId, content) => {
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

  const DiaryDataContext = createContext()
  const DiaryDispatchContext = createContext()


  // 이미지를 assets 폴더에 넣어서 사용하면 vite에서 자동으로 최적화해서 처리함(캐싱)
  // 이미지의 수가 많으면 public 폴더도 이용
  // a태그를 이용한면 클라이언트 사이드 렌더링이 아닌 서버 사이드 렌더링이 되어 페이지가 새로고침됨
  return (
    <>
    <DiaryDataContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCrate, onUpdate, onDelete}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="*" element={<Notfound/>} /> 
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryDataContext.Provider>
  </>
  );
}

export default App