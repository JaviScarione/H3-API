import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ModifyClient () {
    const id = useParams();

    useEffect(() => {
       console.log(id);
    }, []);
    return (
        <div>
            {id}
        </div>
    );
}

export default ModifyClient;