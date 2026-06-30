import axios from "axios";

export const GetAllPostsApi = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/posts/get"
  );

  return response.data;
};