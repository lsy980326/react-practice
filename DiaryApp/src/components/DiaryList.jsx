import Button from './Button';
import './DiaryList.css';
import DiaryItem from './DiaryItem';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const DiaryList = ({data}) => {
    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest"); // 정렬 타입 상태 관리

    // 정렬 타입 변경 핸들러
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }

    // 정렬된 데이터 반환 함수
    const getSortedData = () => {
        return data.toSorted((a, b) => {
            if (sortType === "oldest") {
                // 오래된 순으로 정렬
                // a.createdDate가 b.createdDate보다 이전이면 음수, 이후면 양수 반환
                return Number(a.createdDate - b.createdDate);
            } else {
                // 최신 순으로 정렬
                // b.createdDate가 a.createdDate보다 이전이면 음수, 이후면 양수 반환
                return Number(b.createdDate - a.createdDate);
            }
        });
    }

    const sortedData = getSortedData(); // 정렬된 데이터

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                {/* 정렬 타입 선택 드롭다운 */}
                <select onChange={onChangeSortType} value={sortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오랜된 순</option>
                </select>
                {/* 새 일기 쓰기 버튼 */}
                <Button 
                    onClick={() => nav("/new")}
                    text={"새 일기 쓰기"} 
                    type={"POSITIVE"}
                />
            </div>
            <div className="menu_wrapper">
                {/* 정렬된 일기 목록 렌더링 */}
                {sortedData.map((item) => (
                    <DiaryItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default DiaryList;