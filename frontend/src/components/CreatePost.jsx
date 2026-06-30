import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreatePostApi } from "../apis/CreatePostApi";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

  const navigate=useNavigate()
  const [data, setData] = useState({
    title: "",
    description: "",
    like: 0,
    viwes: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: CreatePostApi,

    onSuccess: (response) => {
      console.log("Post Created Successfully", response);

      alert(response.message);

      setData({
        title: "",
        description: "",
        like: 0,
        viwes: 0,
      });
      navigate("/posts")
    },

    onError: (error) => {
      console.log(error);
      alert(error.response?.data?.message || "Post Creation Failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(data);

    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-1"
            >
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter Title"
              value={data.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Enter Description"
              value={data.description}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="like"
              className="block text-sm font-medium mb-1"
            >
              Likes
            </label>

            <input
              id="like"
              name="like"
              type="number"
              value={data.like}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="viwes"
              className="block text-sm font-medium mb-1"
            >
              Views
            </label>

            <input
              id="viwes"
              name="viwes"
              type="number"
              value={data.viwes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isPending ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;