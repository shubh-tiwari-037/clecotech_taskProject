import axios from "axios";

export const LogoutApi = async () => {

  // const token = localStorage.getItem("accessToken");
// console.log(token);
  const response = await axios.post(
    "http://localhost:3000/api/v1/users/logout",
    {},
      {
      withCredentials: true,
    }

    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  return response.data;
};