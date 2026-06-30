import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetPostByIdApi } from "../apis/GetPostByIdApi";
import { UpdatePostApi } from "../apis/UpdatePostApi";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const { data: postData } = useQuery({
    queryKey: ["post", id],
    queryFn: () => GetPostByIdApi(id),
  });

  useEffect(() => {
    if (postData) {
      setData({
        title: postData.post.title,
        description: postData.post.description,
      });
    }
  }, [postData]);

  const mutation = useMutation({
    mutationFn: (body) => UpdatePostApi(id, body),

    onSuccess: (response) => {
      alert(response.message);
      navigate(`/posts/${id}`);
    },
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(data);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 shadow p-6">

      <h1 className="text-2xl font-bold mb-5">
        Update Post
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="border w-full p-2 mb-4"
        />

        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          className="border w-full p-2 mb-4"
          rows="6"
        />
<button
  type="submit"
  className="bg-blue-600 text-white px-5 py-2 rounded"
>
  {mutation.isPending ? "Updating..." : "Update Post"}
</button>

      </form>

    </div>
  );
};

export default UpdatePost;