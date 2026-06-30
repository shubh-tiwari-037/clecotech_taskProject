import axios from "axios";

export const UpdatePostApi = async (id, data) => {
  // const token = localStorage.getItem("accessToken");

  const response = await axios.patch(
    `http://localhost:3000/api/v1/posts/${id}`,
    data,
    {
      withCredentials:true
   }
  );

  return response.data;
};