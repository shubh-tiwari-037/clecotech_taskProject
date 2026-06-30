import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/users";

export const getAllUsers = async () => {
  // const token = localStorage.getItem("accessToken");

  const response = await axios.get(`${BASE_URL}/get`,
     {
      withCredentials:true
   }
  //    {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }
);

  return response.data;
};

export const deleteUser = async (id) => {
  // const token = localStorage.getItem("accessToken");

  const response = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials:true
   });

  return response.data;
};