import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";

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

const Editor = () => {

    const emotionId =1;

    return (
        <div className="Editor">
            <div className="date_section">
                <h4>오늘의 날짜</h4>
                <input type="date" />
            </div>
            <div className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map((item)=>(
                        <EmotionItem 
                            key={item.emotionId} 
                            {...item} 
                            isSelected={item.emotionId === emotionId}
                        />
                    ))}
                </div>
            </div>
            <div className="content_section">
                <h4>오늘의 일기</h4>
                <textarea placeholder="오늘은 어땠나요?"/>
            </div>
            <div className="button_section">
                <Button text={"취소하기"}/>
                <Button text={"작성완료"} type={"POSITIVE"}/>
            </div>
        </div>
    )
}

export default Editor;