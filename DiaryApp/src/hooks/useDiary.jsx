import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDiaryStore from '../store/Diary';

// 커스텀 훅
const useDiary = (id) => {
    const data = useDiaryStore((state) => state.data); // 훅을 호출하여 data 가져오기
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();

    useEffect(() => {
        if (!data || data.length === 0) {
            return;
        }

        const currentDiaryItem = data.find(
            (item) => String(item.id) === String(id)
        );

        if (!currentDiaryItem) {
            window.alert("해당 일기를 찾을 수 없습니다.");
            nav('/', { replace: true });
        } else {
            setCurDiaryItem(currentDiaryItem);
        }
    }, [id, nav]);

    return curDiaryItem;
};

export default useDiary;