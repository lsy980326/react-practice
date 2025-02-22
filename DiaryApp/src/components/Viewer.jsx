import "./Viewer.css"
import { getEmotionImage } from "../util/get-emotion-image"
import { emotionList } from "../util/constants";

const Viewer = ({emotionId,content}) => {
    const emotionItem = emotionList.find((item) => item.emotionId === emotionId);

    return (
        <div className="Viewer">
            <div className="img_section">
                <h4>오늘의 감정</h4>
                <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
                    <img src ={getEmotionImage(emotionId)}/>
                    <div>
                        {emotionItem.emotionName}
                    </div>
                </div>
            </div>
            <div className="content_section">
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}

export default Viewer