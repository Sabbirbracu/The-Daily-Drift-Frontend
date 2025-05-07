import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
import { useGetPostByUserQuery } from "../features/post/postApi";
import ListPostCard from "./card/ListPostCard";

const UserDashboardPost = () => {
  const { token, userRole } = useAuth();
  const { isError, isLoading, error, data } = useGetPostByUserQuery(token);

  return (
    <div>
      <div className="mb-4">
        <Link
          to={`/dashboard-${userRole.toLowerCase()}/create-post`}
          className=" bg-green-500 px-4 py-2 rounded-lg"
        >
          Create Post
        </Link>
      </div>

      <div className="grid gap-4">
        {isLoading && <div>Loading.........</div>}

        {isError && <div>Something went wrong! {error?.message}</div>}

        {!isLoading &&
          !isError &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.map((post) => (
            <ListPostCard
              key={post._id}
              title={post.title}
              image={post.image}
              category={post.category}
              createdAt={post.createdAt}
            />
          ))}

        {!isLoading && !isError && !Array.isArray(data) && (
          <div>{data.message || "No posts found."}</div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPost;
