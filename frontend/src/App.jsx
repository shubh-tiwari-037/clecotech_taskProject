import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import AllPosts from "./components/AllPosts";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import RefreshTokenButton from "./components/RefreshTokenButton";
import { AdminPage } from "./components/adminComponents/AdminPage";
import AdminNavbar from "./components/adminComponents/AdminNavbar";
import AllUsers from "./components/AllUsers.jsx";


// const user = JSON.parse(localStorage.getItem("user"));

// const App = () => (

//   <BrowserRouter>
//      {user?.role === "Admin" ? (
//         <AdminNavbar />
//       ) : (
//         <Navbar />
//       )}

//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/posts" element={<AllPosts />} />
//       <Route path="/posts/:id" element={<PostDetails />} />
//       <Route path="/create-post" element={<CreatePost />} />
//       <Route path="/posts/update/:id" element={<UpdatePost />}/>
//         <Route path="/refresh" element={<RefreshTokenButton />} />


//         <Route path="/admin" element={<AdminPage />} />
//           <Route path="/users" element={<AllUsers />} />
           
//     </Routes>
//   </BrowserRouter>
// );

// export default App;





const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      {user?.role === "Admin" ? <AdminNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/update/:id" element={<UpdatePost />} />
        <Route path="/refresh" element={<RefreshTokenButton />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/users" element={<AllUsers />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// const App = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
// const [user,setUser] =useState(null)
//   return (
//     <BrowserRouter>
//       {user?.role === "Admin" ? <AdminNavbar /> : <Navbar />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login setUser={setUser}/>} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/posts" element={<AllPosts />} />
//         <Route path="/posts/:id" element={<PostDetails />} />
//         <Route path="/create-post" element={<CreatePost />} />
//         <Route path="/posts/update/:id" element={<UpdatePost />} />
//         <Route path="/refresh" element={<RefreshTokenButton />} />
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/users" element={<AllUsers />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;