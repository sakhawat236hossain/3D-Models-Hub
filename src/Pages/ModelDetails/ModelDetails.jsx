import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";

const ModelDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    fetch(`https://3d-models-hub-server-nu.vercel.app/getSingleModel/${id}`, {
      headers: { authorization: `Bearer ${user?.accessToken}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Model Not Found");
        return res.json();
      })
      .then(data => {
        setModel(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, user]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to restore this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://3d-models-hub-server-nu.vercel.app/${model._id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(() => {
            toast.success("Model Deleted Successfully!");
            navigate("/all-models");
          })
          .catch(() => toast.error("Failed to delete!"));
      }
    });
  };

const handleDownload = () => {
  if (!user) {
    toast.error("Please login first!");
    return navigate("/login");
  }

  fetch(`https://3d-models-hub-server-nu.vercel.app/downloads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.accessToken}`,
    },
    body: JSON.stringify({
      model_id: model._id,
      name: model.name,
      category: model.category,
      thumbnailUrl: model.thumbnailUrl,
      description: model.description,
      download_by: user.email,
      download_date: new Date(),
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to save download");
      return res.json();
    })
    .then(data => {
      console.log(data);

      // ✅ Update UI
      setModel(prev => ({
        ...prev,
        downloads: (prev.downloads || 0) + 1,
      }));

      toast.success("✅ Download Saved!");

      // ✅ Navigate properly
      navigate("/my-downloads");
    })
    .catch(err => {
      console.error(err);
      toast.error("❌ Download Failed!");
    });
};



  if (loading) return <Spinner />;
  if (!model) return <p className="text-center py-10">No Model Found!</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img src={model.thumbnailUrl} alt={model.name} className="w-full object-cover rounded-xl shadow-md" />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800">{model.name}</h1>
            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">{model.category}</div>
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">Downloads: {model.downloads}</div>
            </div>
            <p className="text-gray-600 leading-relaxed">{model.description}</p>

            <div className="flex gap-3 mt-6">
              <Link to={`/update-model/${model._id}`} className="btn btn-primary rounded-full">Update Model</Link>
              <button onClick={handleDownload} className="btn btn-secondary rounded-full">Download</button>
              <button onClick={handleDelete} className="btn btn-outline rounded-full border-gray-300">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
