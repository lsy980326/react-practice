import "./Editor.css";
import { useState,useRef,useContext } from "react";
import {TodoStateContext} from "../../App"

// 새로운 할 일을 입력받고 추가하는 컴포넌트임
const Editor =()=>{
    const {onCraete} = useContext(TodoStateContext)
    // 입력한 할 일 내용 저장하는 상태임
    const [content, setContent] = useState("")
    // 입력창 포커스 제어용 ref임
    const contentRef = useRef();

    // 입력창에 텍스트 입력할 때마다 content 상태 업데이트함
    const onChangeContent = (e) => {
        setContent(e.target.value)
    }

    // 추가 버튼 클릭하거나 엔터키 누르면 실행됨
    const onSubmit = () => {
        // 내용 없으면 포커스 주고 종료함
        if(!content){
            contentRef.current.focus() 
            return
        } 
        // 새로운 할 일 추가하고 입력창 비움
        onCraete(content)
        setContent("")
    }
    
    // 엔터키 누르면 onSubmit 실행함
    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            onSubmit()
        }
    }

    return (
    <div className="Editor">
        {/* 할 일 입력창임
            ref로 DOM 접근하고
            value로 현재값 표시하고
            onChange로 입력값 변경 감지하고
            placeholder로 안내 텍스트 보여주고
            onKeyDown으로 키보드 입력 감지함 */}
        <input 
        ref={contentRef}
        value={content}
        onChange={onChangeContent}
        placeholder="할 일을 입력하세요"
        onKeyDown={onKeyDown}
        />

        {/* 할 일 추가하는 버튼임 */}
        <button 
        onClick={onSubmit}
        >
            추가
        </button>
    </div>
);
}

export default Editor;