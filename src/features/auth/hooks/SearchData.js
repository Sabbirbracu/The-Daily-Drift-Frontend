import { useMemo } from "react";
import { useSearchParams } from "react-router-dom"; // ✅ import this
import { useGetPostsQuery } from "../../post/postApi";

const useSearchData = () => {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || ""; // ✅ get `search` from URL

  const { data, isLoading, isError, error } = useGetPostsQuery();

  const filteredPosts = useMemo(() => {
    if (!data) return [];
    if (!searchValue) return data;

    return data.filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [data, searchValue]);

  return { posts: filteredPosts, isLoading, isError, error };
};

export default useSearchData;
