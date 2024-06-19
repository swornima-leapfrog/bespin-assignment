import Blogs from "./Blogs/Blogs";
import { getBlogs } from "~/services/blogs";
import ActionAreaCard from "~/components/Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecommendations, addFriend } from "~/services/friends";
import { RecommendFriend } from "~/interfaces/friends.interface";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

function Home() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingBlogs, data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs
  });

  const { isLoading: isLoadingRecommendations, data: recommendations } =
    useQuery({
      queryKey: ["recommendations"],
      queryFn: getRecommendations
    });

  const { mutateAsync: sendFriendRequest } = useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addFriend"]
      });
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    }
  });

  const handleClick = async (id: number) => {
    try {
      await sendFriendRequest(id);
      toast.success("Friend request sent successfully");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div>
      <div className="flex gap-8 my-4">
        <div className="flex-1 w-3/4">
          <h1 className="text-2xl font-semibold">Trending blogs</h1>
          <Blogs blogs={blogs} isLoading={isLoadingBlogs} width={800} />
        </div>
        <div className="w-1/4">
          <h1 className="text-2xl font-semibold">People you may know</h1>

          {isLoadingRecommendations ? (
            <>Loading...</>
          ) : (
            recommendations.map((recommendation: RecommendFriend) => (
              <ActionAreaCard
                key={recommendation.id}
                title={recommendation.username}
                content={recommendation.email}
                children={
                  !recommendation.sentRequest && (
                    <div>
                      <button
                        className="mt-4 bg-blue-700 rounded-md text-white p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(recommendation.id);
                        }}
                      >
                        Add button
                      </button>
                    </div>
                  )
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
