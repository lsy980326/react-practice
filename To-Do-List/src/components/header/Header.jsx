import "./Header.css";
import {memo} from "react"

// memo는 컴포넌트의 props가 변경되지 않으면 리렌더링을 방지하는 고차 컴포넌트입니다
// Header 컴포넌트는 props를 받지 않으므로 불필요한 리렌더링을 방지하기 위해 memo로 감쌌습니다
// 부모 컴포넌트가 리렌더링되어도 Header는 다시 렌더링되지 않습니다
const Header =()=>{
    return (
        <div className="Header">
           <h3>오늘은 🐿️</h3>
           <h1>{new Date().toDateString()}</h1>
        </div>
    );
}

export default memo(Header);