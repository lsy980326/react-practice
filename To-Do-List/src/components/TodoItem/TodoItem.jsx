import "./TodoItem.css";
import {memo, useContext} from "react"
import {TodoDispatchContext} from "../../App"

// TodoItem 컴포넌트는 할 일 항목 하나를 렌더링하는 컴포넌트입니다
// props로 id, isDone, content, date와 이벤트 핸들러 함수들을 받습니다
const TodoItem = ({id,isDone,content,date}) =>{

    const {onUpdate,onDelete} = useContext(TodoDispatchContext)


    const onChangeCheckbox = () => {
        onUpdate(id)
    }

    const onClickDelete = () => {
        onDelete(id)
    }

    return (
        <div className="TodoItem">
            <input 
            onChange={onChangeCheckbox} 
            checked={isDone} 
            type="checkbox"/>
            <div className="content">{content}</div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>
            <button onClick={onClickDelete}>삭제</button>
        </div>
    )
}

// React.memo는 컴포넌트의 리렌더링 성능을 최적화하는 고차 컴포넌트(HOC)입니다
// HOC는 컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수입니다

// 단순히 memo(TodoItem)만 사용하면 얕은 비교만 수행하게 됩니다
// onUpdate, onDelete같은 함수 props는 App 컴포넌트가 리렌더링될 때마다 
// 새로운 참조값을 가지게 되어 TodoItem도 불필요하게 리렌더링됩니다

// 따라서 두 번째 인자로 비교 함수를 전달하여 
// 실제로 변경이 필요한 props가 바뀌었을 때만 리렌더링되도록 최적화합니다
// export default memo(TodoItem,(prevProps,nextProps)=>{
//     // 각 prop을 개별적으로 비교
//     // false를 반환하면 리렌더링을 방지하고
//     // true를 반환하면 리렌더링을 수행합니다
//     if(prevProps.id === nextProps.id) return false;
//     if(prevProps.isDone === nextProps.isDone) return false; 
//     if(prevProps.content === nextProps.content) return false;
//     if(prevProps.date === nextProps.date) return false;
//     return true;
// });

export default memo(TodoItem); // 불필요한 리렌더링을 방지하기 위해 memo