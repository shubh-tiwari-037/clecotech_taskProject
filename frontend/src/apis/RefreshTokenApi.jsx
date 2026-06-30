import axios from "axios";

export const RefreshTokenApi = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await axios.post(
    "http://localhost:3000/api/v1/users/refresh",
    {
      refreshToken,
    }
  );

  return response.data;
};