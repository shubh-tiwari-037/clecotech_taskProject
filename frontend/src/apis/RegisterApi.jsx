import axios from "axios";

export const RegisterApi = async (data) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/users/register",
    data,
  );

  return response.data;
};
