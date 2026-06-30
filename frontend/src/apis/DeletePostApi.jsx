import axios from "axios";

export const DeletePostApi = async (id) => {
  // const token = localStorage.getItem("accessToken");

  const response = await axios.delete(
    `http://localhost:3000/api/v1/posts/${id}`,
   {
      withCredentials:true
   }
  );

  return response.data;
};