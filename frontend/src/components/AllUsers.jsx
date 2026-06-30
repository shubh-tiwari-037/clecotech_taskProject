// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllUsers, deleteUser} from "../apis/adminApi/AdminApi.js";

// const AllUsers = () => {
//   const {
//     data,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: getAllUsers,
//   });

//   if (isLoading) {
//     return <h2>Loading Users...</h2>;
//   }

//   if (isError) {
//     return <h2>Something went wrong!</h2>;
//   }

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-bold mb-4">All Users</h1>

//       <table className="w-full border border-gray-300">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border p-2">S.No</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Role</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data?.users?.map((user, index) => (
//             <tr key={user._id}>
//               <td className="border p-2">{index + 1}</td>
//               <td className="border p-2">{user.name}</td>
//               <td className="border p-2">{user.email}</td>
//               <td className="border p-2">{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllUsers;



import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAllUsers,
  deleteUser,
} from "../apis/adminApi/AdminApi";

const AllUsers = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: (response) => {
      alert(response.message);

      // Users list dubara fetch hogi
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      alert(error.response?.data?.message);
    },
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>Something went wrong!</h2>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">
        All Users
      </h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">S.No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.users?.map((user, index) => (
            <tr key={user._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>

              <td className="border p-2">
                <button
                  onClick={() =>
                    deleteMutation.mutate(user._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;