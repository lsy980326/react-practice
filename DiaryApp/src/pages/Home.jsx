import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';

const Home = () => {
    return (
        <div>
            <Header 
                title={"2024년 2월"}
                leftChild={<Button text={"<"} type={"primary"} />}
                rightChild={<Button text={">"} type={"primary"} />}
            />
            <DiaryList />
        </div>
    );
}

export default Home;