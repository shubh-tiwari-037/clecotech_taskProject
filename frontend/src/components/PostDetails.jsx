// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { GetPostByIdApi } from "../apis/GetPostByIdApi";

// const PostDetails = () => {

//   const { id } = useParams();

//   const { data, isLoading } = useQuery({

//     queryKey: ["post", id],

//     queryFn: () => GetPostByIdApi(id),

//   });

//   if (isLoading) return <h1>Loading...</h1>;

//   const post = data.post;

//   return (

//     <div className="max-w-3xl mx-auto mt-10 border rounded p-6 shadow">

//       <h1 className="text-3xl font-bold">
//         {post.title}
//       </h1>

//       <p className="mt-5">
//         {post.description}
//       </p>

//       <div className="mt-5">

//         <p>
//           ❤️ Likes : {post.like}
//         </p>

//         <p>
//           👁 Views : {post.viwes}
//         </p>

//         <p>
//           👤 Created By : {post.user.name}
//         </p>

//       </div>

//     </div>

//   );
// };

// export default PostDetails;



import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GetPostByIdApi } from "../apis/GetPostByIdApi";
import { DeletePostApi } from "../apis/DeletePostApi";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: () => GetPostByIdApi(id),
  });

  const deleteMutation = useMutation({
    mutationFn: DeletePostApi,

    onSuccess: (response) => {
      alert(response.message);
      navigate("/posts");
    },

    onError: (error) => {
      alert(error.response?.data?.message);
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  const post = data.post;
 console.log("Route ID:", id);
console.log("API Response:", data);

  const isOwner = loggedInUser?.email === post.user.email;

  return (
    <div className="max-w-3xl mx-auto mt-10 border rounded p-6 shadow">

      <h1 className="text-3xl font-bold">
        {post.title}
      </h1>

      <p className="mt-5">
        {post.description}
      </p>

      <div className="mt-5 space-y-2">
        <p>❤️ Likes : {post.like}</p>
        <p>👁 Views : {post.viwes}</p>
        <p>👤 Created By : {post.user.name}</p>
      </div>

      {isOwner && (
        <div className="flex gap-4 mt-8">

          <button
            onClick={() => navigate(`/posts/update/${id}`)}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Update
          </button>

          <button
            onClick={() => deleteMutation.mutate(id)}
            className="bg-red-600 text-white px-5 py-2 rounded"
          >
            Delete
          </button>

        </div>
      )}

    </div>
  );
};

export default PostDetails;