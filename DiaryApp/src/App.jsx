import './App.css'
import {useReducer,useRef,createContext, useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Diary from './pages/Diary'
import Notfound from './pages/NotFound'
import Edit from './pages/Edit'
import Loading from './Lottie/Loading'



// 1. "/" : 모든 일기를 조회하는 home 페이지
// 2. "/new" : 새 일기를 작성하는 페이지
// 3. "/diary" : 일기를 조회하는 페이지
function reducer(state, action){
  let nextState;

  switch(action.type){
    case "INIT":
     return action.data; //로컬스토리지에 보관할 필요가 없어서 바로 return
    case "CREATE": 
    { 
      nextState = [action.data,...state];
      break;
    } // 새 일기를 배열 맨 앞에 추가
    case "UPDATE": 
    { 
      nextState = state.map((item)=>  // id가 일치하는 일기 내용 수정
      String(item.id) === String(action.data.id)
      ? action.data
      : item)
      break;
    }
    case "DELETE": 
    {
      nextState = state.filter((item)=> // id가 일치하는 일기 삭제
      String(item.id) !== String(action.data.id))
      break;
    }
  }
  localStorage.setItem('diary',JSON.stringify(nextState));
  return nextState;
}

// 전역 상태 관리를 위한 Context 생성
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer,[])
  const idRef = useRef(0)

  useEffect(()=>{
    const storedData = localStorage.getItem('diary');
    if(!storedData){
      setIsLoading(false);
      return
    }

    const parsedData = JSON.parse(storedData);
    if(!Array.isArray(parsedData)){
      setIsLoading(false);
      return;
    }


    let maxId = 0;
    parsedData.forEach((item)=>{
      if(item.id > maxId){
        maxId = item.id;
      }
    })

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });

    setIsLoading(false);
  },[])


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

  if(isLoading){
    return <Loading />
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