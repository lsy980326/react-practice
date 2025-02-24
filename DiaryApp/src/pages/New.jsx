import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import useDiaryStore from '../store/Diary';

const New = () => {
    const onCreate = useDiaryStore((state) => state.createDiary); // 훅을 호출하여 onCreate 가져오기
    const nav = useNavigate();
    usePageTitle("새 일기 쓰기");

    const onSubmit = (input) => {
        onCreate(
            input.createdDate.getTime(),
            input.emotionId,
            input.content
        );
        nav('/', { replace: true });
    };

    // 네비게이트에 -1을 입력하면 페이지 뒤로 가기
    return (
        <div>
            <Header 
                title={"새 일기 쓰기"}
                leftChild={<Button 
                    text={"< 뒤로가기"}
                    onClick={() => nav(-1)}
                />}
            />
            <Editor onSubmit={onSubmit} />
        </div>
    );
};

export default New;