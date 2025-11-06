
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLoaderData} from "react-router";


const ModelDetails = () => {
  // const navigate = useNavigate();
  // const { id } = useParams();
  const model=useLoaderData()
  console.log(model);
  // const { user } = useContext(AuthContext);

  // const [model, setModel] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [refetch, setRefetch] = useState(false);

  // useEffect(() => {
  //   if (!user) return;

  //   fetch(`https://3d-model-server.vercel.app/models/${id}`, {
  //     headers: {
  //       authorization: `Bearer ${user.accessToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setModel(data.result);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, [user, id, refetch]);

  // const handleDelete = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to restore this file!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       fetch(`https://3d-model-server.vercel.app/models/${model._id}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then(() => {
  //           Swal.fire("Deleted!", "Model removed successfully.", "success");
  //           // navigate("/all-models");
  //         });
  //     }
  //   });
  // };

  // const handleDownload = () => {
  //   if (!user) return toast.error("Please login to download.");

  //   const updatedData = {
  //     downloads: model.downloads + 1,
  //     downloaded_by: user.email,
  //   };

  //   fetch(`https://3d-model-server.vercel.app/download/${model._id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updatedData),
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       toast.success("✅ Download Count Updated!");

  //       // update UI
  //       setRefetch(!refetch);

  //       // finally open download link
  //       window.open(model.file_url, "_blank");
  //     });
  // };


  // if (loading) return <p className="text-center py-10">Loading...</p>;



//   fetch(`https://3d-model-server.vercel.app/downloads/${model._id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(finalModel),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       toast.success("Successfully downloaded!");
  //       setRefecth(!refetch)

  //       // alternative solution of realtime download count update

  //   //     fetch(`https://3d-model-server.vercel.app/models/${id}`, {
  //   //   headers: {
  //   //     authorization: `Bearer ${user.accessToken}`,
  //   //   },
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     setModel(data.result);
  //   //     console.log(" Api called!")
  //   //     console.log(data);
  //   //     setLoading(false);
  //   //   });

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // if (loading) {
  //   return <div> Loading...</div>;
  // }



  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">

          <div className="shrink-0 w-full md:w-1/2">
            <img src={model.thumbnailUrl} alt="" className="w-full object-cover rounded-xl shadow-md" />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{model.name}</h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {model.category}
              </div>
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                Downloads: {model.downloads}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {model.description}
            </p>

            <div className="flex gap-3 mt-6">
              <Link to={`/update-model/${model._id}`} className="btn btn-primary rounded-full">
                Update Model
              </Link>

              <button className="btn btn-secondary rounded-full">
                Download
              </button>

              {/* <button onClick={handleDelete} className="btn btn-outline rounded-full border-gray-300">
                Delete
              </button> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModelDetails;          