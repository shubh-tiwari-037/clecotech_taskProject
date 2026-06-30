import React from "react";
import { useMutation } from "@tanstack/react-query";
import { RefreshTokenApi } from "../apis/RefreshTokenApi";

const RefreshTokenButton = () => {

  const { mutate, isPending } = useMutation({

    mutationFn: RefreshTokenApi,

    onSuccess: (response) => {

      localStorage.setItem(
        "accessToken",
        response.accessTocken
      );

      alert(response.message);

      console.log(response);

    },

    onError: (error) => {

      alert(
        error.response?.data?.message || "Refresh Failed"
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

    },

  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      {isPending ? "Refreshing..." : "Refresh Token"}
    </button>
  );
};

export default RefreshTokenButton;