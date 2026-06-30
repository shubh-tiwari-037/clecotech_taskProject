import axios from "axios";

export const LoginApi = async (data) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/users/login",
    data,
    { withCredentials: true },
  );

  return response.data;
};
