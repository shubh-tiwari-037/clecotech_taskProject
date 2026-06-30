
import axios from "axios";

export const GetMeApi = async () => {
  const res = await axios.get(
    "http://localhost:3000/api/v1/users/me",
    {
      withCredentials: true,
    }
  );
console.log("GET ME RESPONSE:", res.data);
  return res.data;
};