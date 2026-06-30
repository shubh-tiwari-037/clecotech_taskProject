import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="flex items-center gap-6">
          <Link
            to="/admin"
            className="text-xl font-semibold hover:text-gray-300 transition"
          >
            Admin Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/users"
            className="hover:text-gray-300 transition"
          >
            All Users
          </Link>


          <Link
            to="/posts"
            className="hover:text-gray-300 transition"
          >
            All Posts
          </Link>

        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">
            Welcome Admin 👋
          </span>

          <LogoutButton />
        </div>

      </div>
    </nav>
  );
};

export default AdminNavbar;