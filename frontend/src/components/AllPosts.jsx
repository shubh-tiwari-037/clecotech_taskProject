import { useQuery } from "@tanstack/react-query";
import { GetAllPostsApi } from "../apis/GetAllPostsApi";
import { Link } from "react-router-dom";

const AllPosts = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: GetAllPostsApi,
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error...</h1>;

  return (
    <div className="max-w-4xl mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-5">
        All Posts
      </h1>

      {data.posts.map((post) => (

        <div
          key={post._id}
          className="border p-5 rounded-lg mb-4 shadow"
        >
          <h2 className="text-2xl font-bold">
            {post.title}
          </h2>

          <Link
            to={`/posts/${post._id}`}
          >
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">

              View

            </button>
          </Link>

        </div>

      ))}

    </div>
  );
};

export default AllPosts;