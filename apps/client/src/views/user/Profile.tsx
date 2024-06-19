import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "~/authentication/AuthContext";
import { getBlogsByAuthorId } from "~/services/blogs";
import { getUsersById } from "~/services/users";
import Blogs from "../Blogs/Blogs";

function Profile() {
  const { user } = useContext(AuthContext);
  const params = useParams<{ id: string }>();
  const router = useNavigate();

  const id = Number(params.id);

  const { isLoading: isLoadingProfile, data: profile } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getUsersById(id)
  });

  const { isLoading: isLoadingBlogs, data: blogs } = useQuery({
    queryKey: ["blogs", id],
    queryFn: () => getBlogsByAuthorId(id)
  });

  const handleClick = () => {
    router("/blogs/add");
  };

  if (isLoadingProfile) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col ">
      <div className="pb-8 my-8 border-b-2 border-black flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <div>
          <p className="text-xl">{profile?.username}</p>
          <p>{profile?.email}</p>
          <p>{profile?.contactNumber}</p>
        </div>
      </div>
      <div>
        {isLoadingBlogs ? (
          <>Loading...</>
        ) : (
          <div>
            <div className=" flex justify-between">
              <h1 className="text-3xl font-semibold">
                {profile.username}'s blogs
              </h1>
              {user?.id === id && (
                <button
                  className="bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800"
                  onClick={handleClick}
                >
                  Add Blog
                </button>
              )}
            </div>
            <Blogs blogs={blogs} isLoading={isLoadingBlogs} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
