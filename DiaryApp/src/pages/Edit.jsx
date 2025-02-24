import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";
import useDiaryStore from '../store/Diary'

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const onUpdate = useDiaryStore((state) => state.updateDiary);
    const onDelete = useDiaryStore((state) => state.deleteDiary);
    const curDiraryItem = useDiary(params.id);
    usePageTitle(`${params.id}번 일기 수정`);

    

    const onClickDelete = () => {
        if(window.confirm("정말 삭제하시겠습니까?"))
        {
            //삭제 로직
            onDelete(params.id);
            nav('/',{replace:true})
        }
    }

    const onSubmit = (input) => {
        if(window.confirm("정말 수정하시겠습니까?"))
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