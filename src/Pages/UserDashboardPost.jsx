import { Link } from "react-router-dom";
import LatestPostCard from "../components/card/LatestPostCard";
import useAuth from "../features/auth/hooks/useAuth";
import { useGetPostByUserQuery } from "../features/post/postApi";

const UserDashboardPost = () => {
  const { user } = useAuth();
  const { isError, isLoading, error, data } = useGetPostByUserQuery();

  return (
    <div>
      <div className="mb-4">
        <Link
          to={`/dashboard-${user.role.toLowerCase()}/create-post`}
          className=" bg-green-500 px-4 py-2 rounded-lg"
        >
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading && <div>Loading.........</div>}

        {isError && <div>Something went wrong! {error?.message}</div>}

        {!isLoading &&
          !isError &&
          Array.isArray(data) &&
          data.length > 0 &&
          data.map((post) => {
            return (
              <div key={post._id}>
                <LatestPostCard post={post} showMenu={true} />
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
