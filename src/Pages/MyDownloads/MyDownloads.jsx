import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";

const MyDownloads = () => {
  const { user } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // prevent API call if user is not logged in

    fetch(`https://3d-models-hub-server-nu.vercel.app/my-downloads?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModels(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <div className="text-center py-10">Please wait ... Loading...</div>;
  }

  if (!models.length) {
    return <div className="text-center py-10">No downloads found!</div>;
  }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
      {models.map((model) => (
        <ModelCard key={model._id} model={model} />
      ))}
    </div>
  );
};

export default MyDownloads;
