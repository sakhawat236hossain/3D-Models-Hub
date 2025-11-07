import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";
import Spinner from "../../components/Spinner";
const MyModels = () => {
    const {user} = use(AuthContext)
    const [models, setModels] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {

        fetch(`https://3d-models-hub-server-nu.vercel.app/my-models?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data);
            setModels(data)
            setLoading(false)
        })

    }, [user])


    if(loading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                     {models.map(model => <ModelCard key={model._id} model={model}/>)}
                  </div>
            
        </div>
    );
};

export default MyModels;