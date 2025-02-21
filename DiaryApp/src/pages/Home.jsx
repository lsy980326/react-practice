import {useState,useContext} from 'react'
import {DiaryStateContext} from '../App';
import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';

const getMonthlyData = (pivotDate,data) => {
    // 해당 월의 시작 시간 (1일 0시 0분 0초)
    const beginTime = new Date(pivotDate.getFullYear(),pivotDate.getMonth(),1,0,0,0).getTime();
    // 해당 월의 마지막 시간 (말일 23시 59분 59초)
    const endTime = new Date(pivotDate.getFullYear(),pivotDate.getMonth()+1,0,23,59,59).getTime();

    // 해당 월에 작성된 일기만 필터링하여 반환
    return data.filter((item)=>item.createdDate >= beginTime && item.createdDate <= endTime);
}


const Home = () => {
    const data = useContext(DiaryStateContext); // 전역 상태에서 일기 데이터 가져오기
    const [pivotDate, setPivotDate] = useState(new Date()); // 현재 선택된 월 상태 관리

    const monthlyData = getMonthlyData(pivotDate,data); // 선택된 월의 일기 데이터만 필터링

    const onIncreateMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }


    return (
        <div>
            <Header 
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreateMonth}/>}
            />
            <DiaryList data={monthlyData}/>
        </div>
    );
}

export default Home;