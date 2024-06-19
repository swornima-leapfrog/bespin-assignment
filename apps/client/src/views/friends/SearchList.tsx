import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ActionAreaCard from "~/components/Card";
import { useAddFriend } from "~/hooks/useAddFriend";
import { RecommendFriend } from "~/interfaces/friends.interface";
import { searchByName } from "~/services/friends";

function SearchList() {
  const params = useParams<{ search: string }>();

  const searchValue = params.search ?? "";

  const { isLoading, data } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: () => searchByName(searchValue)
  });

  const { mutateAsync: sendFriendRequest } = useAddFriend();

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

  if (!data || !data.length) {
    return (
      <h1 className="mt-8 text-3xl font-semibold">
        No data found related to username: {searchValue}
      </h1>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {isLoading ? (
        <>Loading...</>
      ) : (
        data.map((searchFriend: RecommendFriend) => (
          <ActionAreaCard
            key={searchFriend.id}
            title={searchFriend.username}
            content={searchFriend.email}
            children={
              !searchFriend.sentRequest && (
                <div>
                  <button
                    className="mt-4 bg-blue-700 rounded-md text-white p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(searchFriend.id);
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
  );
}

export default SearchList;
