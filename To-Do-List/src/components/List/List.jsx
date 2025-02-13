import "./List.css";
import TodoItem from "../TodoItem/TodoItem";
import { useState, useMemo, useContext } from "react";
import {TodoStateContext} from "../../App"

// 할일 목록과 검색, 통계 기능을 제공하는 컴포넌트임
const List =()=>{
    const todos = useContext(TodoStateContext)

    // 검색어를 관리하는 상태임
    const [search,setSearch] = useState("")

    // 검색어 입력시 상태를 업데이트하는 핸들러 함수임
    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    // 검색어에 따라 할일 목록을 필터링하는 함수임
    // 검색어가 비어있으면 전체 목록을 반환하고
    // 검색어가 있으면 내용에 검색어가 포함된 항목만 필터링해서 반환함
    const getFilteredTodos = () => {
        if(search===""){
            return todos
        }
        return todos.filter((todo)=>{
            return todo.content.toLowerCase().includes(search.toLowerCase())
        })
    }
    
    // 필터링된 할일 목록을 저장하는 변수임
    const filteredTodos = getFilteredTodos()

    // useMemo를 사용해서 할일 통계 데이터를 메모이제이션함
    // 첫번째 파라미터: 메모이제이션할 값을 계산하는 콜백함수
    // 두번째 파라미터: 의존성 배열 - 배열 내의 값이 변경될 때만 콜백함수 재실행됨
    // todos가 변경될 때만 재계산되어 성능을 최적화함
    // 메모이제이션을 사용하지 않으면 컴포넌트가 리렌더링될 때마다
    // 매번 통계를 다시 계산하게 되어 비효율적임
    const {totalCount,doneCount,notDoneCount} = 
    useMemo(() => {
        console.log("getAnalyzedDate 호출됨")
        // 전체 할일 개수 계산함
        const totalCount = todos.length
        // 완료된 할일 개수를 필터링해서 계산함
        const doneCount = todos.filter((todo)=>todo.isDone).length
        // 미완료된 할일 개수는 전체에서 완료된 개수를 뺌
        const notDoneCount = totalCount - doneCount

        // 계산된 통계 데이터를 객체로 반환함
        // 이 반환값이 메모이제이션되어 재사용됨
        return {
            totalCount,
            doneCount, 
            notDoneCount
        }  
    },[todos]) // 의존성 배열에 todos만 넣어서 todos가 변경될 때만 재계산되도록 함
               // 빈 배열([])을 넣으면 최초 1회만 실행되고 이후엔 항상 메모이제이션된 값 재사용
               // 의존성 배열 생략시 매 렌더링마다 재계산되어 메모이제이션 의미 없어짐

    return (
        <div className="List">
            <h4>Todo List 🌱</h4>
            {/* 할일 통계를 보여주는 영역임 */}
            <div className="AnalyzedData" style={{
                border:"1px solid #000",
                padding:"10px",
                margin:"10px"
            }}>
                <div>totalCount: {totalCount}</div>
                <div>doneCount: {doneCount}</div>
                <div>notDoneCount: {notDoneCount}</div>
            </div>
            
            {/* 검색어를 입력받는 입력창임 */}
            <input 
            value={search}
            onChange={onChangeSearch}
            placeholder="검색어를 입력해주세요." />

            {/* 필터링된 할일 목록을 보여주는 영역임 */}
            <div className="TodoWrapper">
                {/* 필터링된 할일 배열을 순회하면서 각각의 할일 아이템을 렌더링함 */}
                {filteredTodos.map((todo)=>{
                    return (
                        <TodoItem key={todo.id} 
                        {...todo} />
                    )
                })}
            </div>

        </div>
    )
}

export default List;