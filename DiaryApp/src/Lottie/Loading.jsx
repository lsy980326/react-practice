import Lottie from "react-lottie";
import * as animationData from '../assets/Loading.json'

const Loading = () => {
    const defaultOption = {
        loop:true,
        autoplay:true,
        animationData: animationData.default,
        rendererSettings:{
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <Lottie 
        options={defaultOption}
        height={250}
        width={250}
        style={{marginTop: "10rem"}}/>
    )
}

export default Loading;