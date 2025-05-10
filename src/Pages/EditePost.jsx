import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../features/post/postApi";
const EditePost = () => {
  const { id } = useParams();
  console.log("🚀 ~ EditePost ~ id:", id);
  const { isLoading, isError, error, data } = useGetPostByIdQuery(id);
  console.log("🚀 ~ EditePost ~ data:", data);
  return <div>EditePost</div>;
};

export default EditePost;
