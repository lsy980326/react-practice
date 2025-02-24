import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import { useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import getStringedDate from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";
import { use } from "react";
import Loading from '../Lottie/Loading' 

const Diary = () => {
    const parmas = useParams();
    const nav = useNavigate();
    usePageTitle(`${parmas.id}번 일기`);

    // useDiary 커스텀 훅에서 useEffect를 사용하여 데이터를 가져옴
    // useEffect의 특성상 컴포넌트가 마운트된 후 비동기로 데이터를 요청하므로
    // 첫 렌더링 시에는 데이터가 undefined
    const curDiraryItem = useDiary(parmas.id);
    
    // 첫 렌더링(undefined) -> 데이터 요청 -> 데이터 수신 -> 재렌더링 순서로 동작
    // 따라서 undefined 체크는 필수적임
    if(curDiraryItem === undefined){
        return <Loading/>
    }
    const {createdDate,emotionId,content} = curDiraryItem;
    const title = getStringedDate(new Date(createdDate));

    return (
        <div>
            <Header
            title={`${title} 기록`}
            leftChild={<Button text={"< 뒤로가기"} onClick={()=>nav(-1)}/>}
            rightChild={<Button text={"수정하기"} onClick={()=>nav(`/edit/${parmas.id}`)}/>}
            />
            <Viewer emotionId={emotionId} content={content}/>
        </div>
    );
}

export default Diary;