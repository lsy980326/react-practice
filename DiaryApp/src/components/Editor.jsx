import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const emotionList = [
    {
        emotionId: 1,
        emotionName: "완전 좋음"
    },
    {
        emotionId: 2,
        emotionName: "좋음"
    },
    {
        emotionId: 3,
        emotionName: "그럭저럭"
    },
    {
        emotionId: 4,
        emotionName: "나쁨"
    },
    {
        emotionId: 5,
        emotionName: "끔찍함"
    }
]
const getStringedDate = (targetDate) => {
    //날짜 -> yyyy-mm-dd 형식의 문자열로 변환
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
}

const Editor = ({initData,onSubmit}) => {
    // 입력값 상태 관리
    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 3,
        content: "" 
    });

    const nav = useNavigate();

    useEffect(()=>{
        if(initData){
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate)),
            });
        }
    },[initData]);


    const onChangeInput = (e) => {
        console.log(e.target.name, e.target.value);

        let name = e.target.name;
        let value = e.target.value;

        if(name === "createdDate"){
            value = new Date(e.target.value)
        }

        setInput({
            ...input,
            [name] : value
        });
        
    }

    const onClickSubmit = () => {onSubmit(input)}


    return (
        <div className="Editor">
            <div className="date_section">
                <h4>오늘의 날짜</h4>
                <input 
                    name="createdDate"
                    onChange={onChangeInput}
                    value={getStringedDate(input.createdDate)} 
                    type="date" 
                />
            </div>
            <div className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map((item)=>(
                        <EmotionItem 
                            onClick={() => onChangeInput({
                                target: {
                                    name : "emotionId",
                                    value: item.emotionId
                                }
                            })}
                            key={item.emotionId} 
                            {...item} 
                            isSelected={item.emotionId === input.emotionId}
                        />
                    ))}
                </div>
            </div>
            <div className="content_section">
                <h4>오늘의 일기</h4>
                <textarea 
                    name="content"
                    onChange={onChangeInput}
                    value={input.content}
                    placeholder="오늘은 어땠나요?"
                />
            </div>
            <div className="button_section">
                <Button text={"취소하기"} onClick={()=>nav(-1)}/>
                <Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmit}/>
            </div>
        </div>
    )
}

export default Editor;