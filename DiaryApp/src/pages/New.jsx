import Header from '../components/Header';
import Button from '../components/Button';
import Edtior from '../components/Editor';

const New = () => {
    return (
        <div>
            <Header 
                title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로가기"}/>}
            />
            <Edtior/>
        </div>
    );
}

export default New;