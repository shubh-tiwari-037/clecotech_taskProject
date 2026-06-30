// import React from "react";
// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Navbar = () => {
//   const isLoggedIn = !!localStorage.getItem("accessToken");

//   return (
//     <nav className="bg-blue-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

//         {/* Left */}
//         <div className="flex items-center gap-6">
//           <Link
//             to="/"
//             className="text-xl font-semibold hover:text-gray-200 transition"
//           >
//             Home
//           </Link>
//         </div>

//         {/* Center */}
//         <div className="flex items-center gap-6">
//           <Link
//             to="/posts"
//             className="hover:text-gray-200 transition"
//           >
//             All Posts
//           </Link>

//           {isLoggedIn && (
//             <Link
//               to="/create-post"
//               className="hover:text-gray-200 transition"
//             >
//               Create Post
//             </Link>
//           )}
//         </div>

//         <div className="flex items-center gap-6">
//           {isLoggedIn ? (
//             <>
//               <span className="text-sm">
//                 Welcome 👋
//               </span>

//               <LogoutButton />
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="hover:text-gray-200 transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/signup"
//                 className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
//               >
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React from "react";
// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";
// import RefreshTokenButton from "./RefreshTokenButton";

// const Navbar = () => {
//   const isLoggedIn = !!localStorage.getItem("accessToken");

//   return (
//     <nav className="bg-blue-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

//         {/* Left */}
//         <div className="flex items-center gap-6">
//           <Link
//             to="/"
//             className="text-xl font-semibold hover:text-gray-200 transition"
//           >
//             Home
//           </Link>
//         </div>

//         {/* Center */}
//         <div className="flex items-center gap-6">
//           <Link
//             to="/posts"
//             className="hover:text-gray-200 transition"
//           >
//             All Posts
//           </Link>

//           {isLoggedIn && (
//             <Link
//               to="/create-post"
//               className="hover:text-gray-200 transition"
//             >
//               Create Post
//             </Link>
//           )}
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-4">
//           {isLoggedIn ? (
//             <>
//               <span className="text-sm">
//                 Welcome 👋
//               </span>

//               <RefreshTokenButton />

//               <LogoutButton />
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="hover:text-gray-200 transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/signup"
//                 className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
//               >
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React from "react";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import LogoutButton from "./LogoutButton";
// import RefreshTokenButton from "./RefreshTokenButton";
// import { GetMeApi } from "../apis/GetMeApi";

// const Navbar = () => {

//   const { data, isLoading } = useQuery({
//     queryKey: ["me"],
//     queryFn: GetMeApi,
//    retry:false
//   });

//   const isLoggedIn = !!data?.user;

//   return (
//     <nav className="bg-blue-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

//         {/* Left */}
//         <div className="flex items-center gap-6">
//           <Link to="/" className="text-xl font-semibold">
//             Home
//           </Link>
//         </div>

//         {/* Center */}
//         <div className="flex items-center gap-6">
//           <Link to="/posts">All Posts</Link>

//           {isLoggedIn && (
//             <Link to="/create-post">Create Post</Link>
//           )}
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-4">

//           {isLoading ? (
//             <span>Loading...</span>
//           ) : isLoggedIn ? (
//             <>
//               <span>Welcome 👋 {data.user.name}</span>

//               <RefreshTokenButton />
//               <LogoutButton />
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Signup</Link>
//             </>
//           )}

//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LogoutButton from "./LogoutButton";
// import RefreshTokenButton from "./RefreshTokenButton";
import { GetMeApi } from "../apis/GetMeApi";

const Navbar = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: GetMeApi,
    retry: false,
  });

 console.log("DATA:", data);
console.log("ERROR:", error?.response?.data);

  const user = data?.user; 
  const isLoggedIn = !!user;

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Left */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-semibold">
            Home
          </Link>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6">
          <Link to="/posts">All Posts</Link>

          {isLoggedIn && (
            <Link to="/create-post">Create Post</Link>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <span>Loading...</span>
          ) : isLoggedIn ? (
            <>
              <span>Welcome 👋 {user.name}</span>

              {/* <RefreshTokenButton /> */}

              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;