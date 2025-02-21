import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext,useEffect,useState } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext);
    const data = useContext(DiaryStateContext);
    const [curDiraryItem, setCurDiaryItem] = useState();


    useEffect(()=>{
        const currentDiaryItem = data.find(
            (item)=>String(item.id) === String(params.id)
        );

        if(!currentDiaryItem){
            window.alert("해당 일기를 찾을 수 없습니다.");
            nav('/',{replace:true});
        }

        setCurDiaryItem(currentDiaryItem);
    },[params.id]);

    const onClickDelete = () => {
        if(window.confirm("정말 삭제하시겠습니까?"))
        {
            //삭제 로직
            onDelete(params.id);
            nav('/',{replace:true})
        }
    }

    const onSubmit = (input) => {
        if(window.confirm("정말 수정정하시겠습니까?"))
        {
            onUpdate(
                params.id,
                input.createdDate.getTime(),
                input.emotionId,
                input.content
            );
        }   
        nav('/',{replace:true})
    }


    return (
        <div>
            <Header 
            title={"일기 수정하기"} 
            leftChild={<Button text={"< 뒤로 가기"} onClick={()=>nav(-1)}/>}
            rightChild={<Button text={"삭제하기"} type={"NAGATIVE"} onClick={onClickDelete}/>}
            />
            <Editor initData={curDiraryItem} onSubmit={onSubmit}/>
        </div>
    );
}

export default Edit;