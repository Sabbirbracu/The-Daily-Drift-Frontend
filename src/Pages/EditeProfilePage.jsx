import EditeProfile from "../components/EditProfile";
import { useGetProfileQuery } from "../features/Profile/ProfileApi";

const EditeProfilePage = () => {
  const { data, isLoading, isError, error } = useGetProfileQuery();
  return (
    <div>
      {isLoading && <h1>Loading.....</h1>}
      {!isLoading && isError && <h1>Something went wrong {error.message}</h1>}
      {data && <EditeProfile user={data} />}
    </div>
  );
};

export default EditeProfilePage;
