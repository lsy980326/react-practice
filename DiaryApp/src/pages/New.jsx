import Header from '../components/Header';
import Button from '../components/Button';
import Edtior from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';

const New = () => {
    const {onCreate} = useContext(DiaryDispatchContext);
    const nav = useNavigate();

    const onSubmit = (input) => {
        onCreate(
            input.createdDate.getTime(),
            input.emotionId,
            input.content
        );
        nav('/',{replace:true})
    }

    // 네비게이트에 -1을 입력하면 페이지 뒤로 가기
    return (
        <div>
            <Header 
                title={"새 일기 쓰기"}
                leftChild={<Button 
                    text={"< 뒤로가기"}
                    onClick={()=>nav(-1)}
                    />}
            />
            <Edtior onSubmit={onSubmit}/>
        </div>
    );
}

export default New;