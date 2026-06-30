// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { LoginApi } from "../apis/LoginApi";
// import { useMutation } from "@tanstack/react-query";


// const Login = () => {
//   const navigate= useNavigate()
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


//  const { mutate, isPending, isSuccess, isError, error } = useMutation({
//   mutationFn: LoginApi,

//   onSuccess: (response) => {
//     console.log("Login Successfully", response);

//     alert(response.message);

//     // ye tab use hota h jab cookies use na kare 
//     // localStorage.setItem("accessToken", response.accessTocken);
//     // localStorage.setItem("refreshToken", response.refreshTocken);

//     localStorage.setItem("user", JSON.stringify(response.user));

//     setData({
//       email: "",
//       password: "",
//     });
    
// window.location.href = "/";
//     // navigate("/");
//   },

//   onError: (error) => {
//     console.log(error);
//     alert(error.response?.data?.message || "Login Failed");
//   },
// });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//      mutate (data)
//     console.log(data);

//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
          
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email
//             </label>

//             <input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter Email"
//               value={data.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

        
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium mb-1"
//             >
//               Password
//             </label>

//             <input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter Password"
//               value={data.password}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-4 text-sm">
//           Don't have an account?
//           <Link to="/signup" className="text-blue-600 ml-1 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginApi } from "../apis/LoginApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Login = ({setUser}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [data, setData] = useState({
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
const { mutate, isPending } = useMutation({
  mutationFn: LoginApi,

  onSuccess: async (response) => {
    console.log("Login Success:", response);

    const user = response.user;

    alert(response.message);

    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    await queryClient.invalidateQueries({
      queryKey: ["me"],
    });

    setData({
      email: "",
      password: "",
    });

    navigate("/");
  },

  onError: (error) => {
    console.log(error);
    alert(error.response?.data?.message || "Login Failed");
  },
});
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label>Email</label>
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-4">
          <Link to="/signup">Signup</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;