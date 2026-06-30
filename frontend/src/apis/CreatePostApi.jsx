import axios from "axios";

export const CreatePostApi = async (data) => {
  // const token = localStorage.getItem("accessToken");

  // console.log("Token:", token);

  const response = await axios.post(
    "http://localhost:3000/api/v1/posts/create",
    data,
    {
      withCredentials:true
   }
  );

  return response.data;
};