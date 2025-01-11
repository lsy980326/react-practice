import './App.css'
import Header from './components/header/Header'
import Editor from './components/Editor/Editor'
import List from './components/List/List'
import { useState,useRef} from 'react'

// 초기 데이터 목록
const mockData = [
  {
    id: 0,
    isDone: false, // 완료 여부
    content: "React 공부하기",
    date:new Date().getTime(), // 생성 시간
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

function App() {
  // todos 상태와 업데이트 함수
  const [todos, setTodos] = useState(mockData) // mockData를 배열로 감싸지 않음
  const idRef = useRef(3)

  // 새로운 할 일 추가하는 함수
  const onCraete = (content) => {
    const newTodo = {
      id:idRef.current++,
      isDone:false,
      content:content, // 입력받은 내용
      date:new Date().getTime() // 현재 시간
    }

    // 새로운 할 일을 배열 맨 앞에 추가
    setTodos([newTodo,...todos])
  }


  const onUpdate =(targetId) => {
    setTodos(todos.map((todo)=>
        todo.id === targetId 
      ? {...todo,isDone:!todo.isDone} 
      : todo 
    ))
  }

  const onDelete = (targetId) => {
    setTodos(todos.filter((todo)=>todo.id !== targetId))
  }

  return (
    <div className="App">
      <Header /> {/* 헤더 컴포넌트 */}
      <Editor onCraete={onCraete}/> {/* 입력 컴포넌트 */}
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/> {/* 목록 컴포넌트 */}
    </div>
  )
}

export default App
