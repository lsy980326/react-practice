import './App.css'
import Header from './components/header/Header'
import Editor from './components/Editor/Editor'
import List from './components/List/List'
import { useState,useRef,useReducer,useCallback} from 'react' // 필요한 리액트 훅들을 가져옴
import { use } from 'react'

// 초기 데이터 목록 - 앱 실행시 기본으로 표시될 할 일 목록
const mockData = [
  {
    id: 0,
    isDone: false, // 완료 여부를 나타내는 플래그
    content: "React 공부하기", // 할 일 내용
    date:new Date().getTime(), // 생성 시간을 밀리초로 저장
  },
  {
    id: 1,
    isDone: false,
    content: "React 공부하기2", 
    date:new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "React 공부하기3",
    date:new Date().getTime(),
  }
]

// 상태 업데이트를 처리하는 리듀서 함수
function reducer(state,action){
  switch(action.type){
    case "CREATE": // 새로운 할 일 추가
      return [action.data,...state]
    case "UPDATE": // 할 일 완료 상태 토글
      return state.map((todo)=>
        todo.id === action.data.id
        ? {...todo,isDone:!todo.isDone}
        : todo
      )
    case "DELETE": // 할 일 삭제
      return state.filter((todo)=>todo.id !== action.data.id)
    default:
      return state
  }
}


function App() {
  // useReducer를 사용하여 todos 상태 관리
  const [todos, dispatch] = useReducer(reducer,mockData)
  const idRef = useRef(3) // 새로운 할 일의 고유 id를 관리하는 ref

  // 함수를 최적화하는 기준
  // 1. 언제해야할까?: 하나의 기능을 완성했을 때 하는게 좋음 기능구현 -> 최적화
  // 2. 어떤걸해야할까?: 유저의 행동에 따라서 개수가 늘어나거나, 함수가 많은 경우
  // https://goongoguma.github.io/2021/04/26/When-to-useMemo-and-useCallback/

  // 새로운 할 일을 추가하는 함수
  const onCraete = useCallback((content) => {
    dispatch({
      type:"CREATE",
      data:{
        id:idRef.current++, // id 값을 증가시키며 할당
        isDone:false,
        content:content,
        date:new Date().getTime()
      }
    })
  },[])

  // 할 일의 완료 상태를 토글하는 함수
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type:"UPDATE",
      data:{
        id:targetId
      }
    })
  },[])

  // 할 일을 삭제하는 함수
  const onDelete = useCallback((targetId)=>{
    dispatch({
      type:"delete",
      data:{
        id:targetId
      }
    })
  },[]) //함수 메모이제이션

  return (
    <div className="App">
      <Header /> {/* 앱 제목을 표시하는 헤더 컴포넌트 */}
      <Editor onCraete={onCraete}/> {/* 새로운 할 일을 입력받는 컴포넌트 */}
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/> {/* 할 일 목록을 표시하고 관리하는 컴포넌트 */}
    </div>
  )
}

export default App
