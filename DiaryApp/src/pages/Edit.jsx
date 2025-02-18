import { useParams } from "react-router-dom";

const Edit = () => {
    const params = useParams();

    return (
        <div>
            <h1>{params.id}Edit</h1>
        </div>
    );
}

export default Edit;