import axios from "axios";

export const GetPostByIdApi = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/posts/${id}`
  );

  return response.data;
};