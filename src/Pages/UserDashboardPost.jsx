import React from "react";
import { Link } from "react-router-dom";
import LatestPostCard from "../components/card/LatestPostCard";
import useAuth from "../features/auth/hooks/useAuth";
import { useGetPostByUserQuery } from "../features/post/postApi";

const UserDashboardPost = () => {
  const { userRole } = useAuth();
  const { isError, isLoading, error, data } = useGetPostByUserQuery();

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

      <div className="grid grid-cols-3 gap-4">
        {isLoading && <div>Loading.........</div>}

        {isError && <div>Something went wrong! {error?.message}</div>}

        {!isLoading &&
          !isError &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.map((post) => {
            return (
              <div key={post._id}>
                <LatestPostCard post={post} />
              </div>
            );
          })}

        {!isLoading && !isError && !Array.isArray(data) && (
          <div>{data.message || "No posts found."}</div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPost;
