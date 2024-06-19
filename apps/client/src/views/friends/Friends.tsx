import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ActionAreaCard from "~/components/Card";
import { GetFriends, getFriends } from "~/services/friends";

function Friends() {
  const router = useNavigate();

  const handleClick = (id: number) => {
    router(`/profile/${id}`);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends
  });

  if (isLoading) {
    return <>Data is loading...</>;
  }

  if (!data) {
    return <>No data</>;
  }

  return (
    <>
      <div className="grid grid-cols-3">
        {data.map((friend: GetFriends) => (
          <div key={friend.id} onClick={() => handleClick(friend.id)}>
            <ActionAreaCard
              width={345}
              title={friend.username}
              content={friend.email}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Friends;
