import Expertise from "../components/ProfileDetails/Expertise";
import PinnedPost from "../components/ProfileDetails/PinnedPost";
import ReadingList from "../components/ProfileDetails/ReadingList";
import SocialLinks from "../components/ProfileDetails/SocialLinks";
import UpperSection from "../components/ProfileDetails/upperSection";
import UserContent from "../components/ProfileDetails/userContent";
import Spinner from "../components/Spinner";
import { useGetMyProfileQuery } from "../features/users/userApi";

const ProfileDetails = () => {
  const {data : user, isLoading, isError} = useGetMyProfileQuery();
  if (isLoading) return < Spinner size ="lg" className= "mx-auto mt-10" />;
  return (
    <div className="max-w-screen mx-auto">
      <UpperSection />

      <div className="mt-6">
        <UserContent
          label="Bio"
          fieldKey="bio"
          value={user.profileDetails.bio}
          placeholder="Share your personal motto, goal, or a short description..."
        />
        <UserContent
          label="About Me"
          fieldKey="aboutMe"
          value={user.profileDetails.aboutMe}
          placeholder="Write something about your experience, background, or journey..."
          capitalizeFirstLetter = {true}
        />
      </div>

      < SocialLinks />
      < Expertise />
      <PinnedPost />
      <ReadingList />
    </div>

  );
};

export default ProfileDetails;
