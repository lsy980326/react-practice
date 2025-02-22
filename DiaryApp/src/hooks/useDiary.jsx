import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

// 커스텀 훅
const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [curDiraryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();

    useEffect(()=>{
        const currentDiaryItem = data.find(
            (item)=>String(item.id) === String(id)
        );

        if(!currentDiaryItem){
            window.alert("해당 일기를 찾을 수 없습니다.");
            nav('/',{replace:true});
        }

        setCurDiaryItem(currentDiaryItem);
    },[id]);

    return curDiraryItem;
};

export default useDiary;