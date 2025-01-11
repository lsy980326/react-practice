import "./List.css";
import TodoItem from "../TodoItem/TodoItem";
import { useState } from "react";

// 할일 목록을 보여주는 컴포넌트임
const List =({todos,onUpdate,onDelete})=>{

    const [search,setSearch] = useState("")

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const getFilteredTodos = () => {
        if(search===""){
            return todos
        }
        return todos.filter((todo)=>{
            return todo.content.toLowerCase().includes(search.toLowerCase())
        })
    }
    
    const filteredTodos = getFilteredTodos()

    return (
        <div className="List">
            <h4>Todo List 🌱</h4>
            {/* 검색 입력창임 */}
            <input 
            value={search}
            onChange={onChangeSearch}
            placeholder="검색어를 입력해주세요." />

            {/* 할일 아이템들을 감싸는 영역임 */}
            <div className="TodoWrapper">
                {/* todos 배열을 순회하며 필터링된 할일 아이템들을 렌더링함 */}
                {filteredTodos.map((todo)=>{
                    return (
                        <TodoItem key={todo.id} 
                        {...todo}
                        onUpdate={onUpdate}
                        onDelete={onDelete}/>
                    )
                })}
            </div>

        </div>
    )
}

export default List;