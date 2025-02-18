import { useParams } from "react-router-dom";

const Diary = () => {
    const parmas = useParams();
    console.log(parmas);

    return (
        <div>
            <h1>{parmas.id}Diary</h1>
        </div>
    );
}

export default Diary;