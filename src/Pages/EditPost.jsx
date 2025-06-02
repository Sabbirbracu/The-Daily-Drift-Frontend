import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../features/post/postApi";
import CreatePost from "./CreatePost";
const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading, isError, error } = useGetPostByIdQuery(id);
  console.log("🚀 ~ EditPost ~ post:", post);

  return (
    <div>
      {isLoading && <h1>Loading....</h1>}
      {!isLoading && isError && <h1>Something went wrong! {error.message}</h1>}
      {post && <CreatePost post={post}/>}
    </div>
  );
};

export default EditPost;
