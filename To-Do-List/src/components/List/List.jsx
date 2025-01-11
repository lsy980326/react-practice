import "./List.css";
import TodoItem from "../TodoItem/TodoItem";

const List =()=>{
    return (
        <div className="List">
            <h4>Todo List 🌱</h4>
            <input placeholder="검색어를 입력해주세요." />
            <div className="TodoWrapper">
                <TodoItem />
                <TodoItem />
                <TodoItem />
            </div>
        </div>
    )
}

export default List;