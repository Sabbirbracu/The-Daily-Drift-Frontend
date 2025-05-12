import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../features/post/postApi";
import CreatePost from "./CreatePost";
const EditePost = () => {
  const { id } = useParams();
  const { isLoading, isError, error, data } = useGetPostByIdQuery(id);
  console.log("🚀 ~ EditePost ~ data:", data);

  return (
    <div>
      {isLoading && <h1>Loading....</h1>}
      {!isLoading && isError && <h1>Something went wrong! {error.message}</h1>}
      {data && <CreatePost post={data} />}
    </div>
  );
};

export default EditePost;
