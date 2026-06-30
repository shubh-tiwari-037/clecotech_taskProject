import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterApi } from "../apis/RegisterApi";
import { useMutation } from "@tanstack/react-query";
import {  useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: RegisterApi,

    onSuccess: (response) => {
      console.log("Registered Successfully", response);

      alert(response.message);
      setData({
        name: "",
        email: "",
        password: "",
      });

       navigate("/login");
    },

    onError: (error) => {
      console.log(error);
      alert(error.response?.data?.message || "Registration Failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
   mutate(data)
    console.log(data);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter Name"
              value={data.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={data.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
