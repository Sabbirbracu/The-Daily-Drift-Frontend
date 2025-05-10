import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import NewsLetter from "../components/sections/NewsLetter";
import PopularPostWidget from "../components/widgets/PopularPostsWidget";
import { useGetPostByIdQuery } from "../features/post/postApi";

const SinglePost = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetPostByIdQuery(id);
  console.log("🚀 ~ SinglePost ~ data:", data);
  return (
    <div className="bg-gray-950">
      <div className="min-h-screen flex">
        {isLoading && <h1>Loading.....</h1>}
        {!isLoading && isError && (
          <h1>Something went wrong! {error.message}</h1>
        )}
        <div className="flex-2/12 "></div>
        {data && (
          <div className="flex-8/12">
            <h1 className="py-5 text-3xl font-bold capitalize text-center ">
              {data?.title}
            </h1>
            <div
              className="prose text-white"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.content),
              }}
            />
          </div>
        )}
        <div className="flex-2/12 ">
          <PopularPostWidget />
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default SinglePost;
