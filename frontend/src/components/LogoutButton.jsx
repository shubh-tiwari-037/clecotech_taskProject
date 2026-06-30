import { useMutation } from "@tanstack/react-query";
import { LogoutApi } from "../apis/LogoutApi";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: LogoutApi,

    onSuccess: (response) => {
      console.log("Logout Success:", response);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // alert(response.message);

      // navigate("/login");
      window.location.href = "/login";
    },

    onError: (error) => {
      console.log(error);
      alert(error.response?.data?.message || "Logout Failed");
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;