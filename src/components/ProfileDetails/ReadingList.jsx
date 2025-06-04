import { FaBookBookmark } from "react-icons/fa6";
import { useGetPostByIdQuery } from "../../features/post/postApi";
import { useGetMyProfileQuery } from "../../features/users/userApi";
import ListPostCard from "../card/ListPostCard";
import Spinner from "../Spinner";


const ReadingList = () => {
  const { data: profileData, isLoading, isError, error } = useGetMyProfileQuery();

  const readingList = profileData?.readingList || [];

  return (
    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg border border-gray-300 dark:border-gray-700 shadow">
      <h2 className="flex items-center gap-2 text-xl primary-font font-semibold mb-4 text-gray-800 dark:text-white">
        <FaBookBookmark className="text-red-500" />
        Reading List
      </h2>
      {isLoading && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-500">Failed to load reading list: {error?.message}</p>
      )}

      {!isLoading && readingList.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">You haven't saved any posts yet.</p>
      )}

      <div className="space-y-4">
        {readingList.map((postId) => (
          <ReadingListItem key={postId} postId={postId} />
        ))}
      </div>
    </div>
  );
};

const ReadingListItem = ({ postId }) => {
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);

  if (isLoading) return <div className="text-sm text-gray-500">Loading post...</div>;
  if (isError || !post)
    return <div className="text-sm text-red-400">Failed to load post.</div>;

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2">
      <ListPostCard
        id={post._id}
        title={post.title}
        image={post.image}
        category={post.category}
        createdAt={post.createdAt}
      />
    </div>
  );
};

export default ReadingList;
