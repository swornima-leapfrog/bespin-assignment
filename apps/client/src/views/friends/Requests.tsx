import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import ActionAreaCard from "~/components/Card";
import {
  GetFriends,
  acceptRequest,
  getRequests,
  getSentRequests,
  rejectRequest
} from "~/services/friends";

function Requests() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingRequests, data: requests } = useQuery({
    queryKey: ["friends", "requests"],
    queryFn: getRequests
  });

  const { isLoading: isLoadingSent, data: sentRequests } = useQuery({
    queryKey: ["friends", "sentRequests"],
    queryFn: getSentRequests
  });

  const { mutateAsync: acceptFriendRequest } = useMutation({
    mutationFn: acceptRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friends", "accept"]
      });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friends", "requests"] });
    }
  });

  const { mutateAsync: declineRequest } = useMutation({
    mutationFn: rejectRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friends", "reject"]
      });
      queryClient.invalidateQueries({ queryKey: ["friends", "requests"] });
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    }
  });

  const handleAccept = async (id: number) => {
    try {
      await acceptFriendRequest(id);

      toast.success("Friend request accepted");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleRejection = async (id: number) => {
    try {
      await declineRequest(id);

      toast.success("Friend request declined");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  if (!requests) {
    return <>No data</>;
  }

  return (
    <div className="flex flex-col mt-4">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold">Request received</h1>
        {isLoadingRequests ? (
          <>Loading...</>
        ) : (
          requests.map((request: GetFriends) => (
            <ActionAreaCard
              key={request.id}
              width={345}
              title={request.username}
              content={request.email}
              children={
                <div className="flex gap-6 mt-8">
                  <button
                    className="bg-blue-700 text-white font-bold p-2 rounded-lg hover:bg-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(request.id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-600 text-white font-bold p-2 rounded-lg hover:bg-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRejection(request.id);
                    }}
                  >
                    Decline
                  </button>
                </div>
              }
            />
          ))
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold">Request sent</h1>
        {isLoadingSent ? (
          <>Loading...</>
        ) : (
          sentRequests.map((request: GetFriends) => (
            <ActionAreaCard
              key={request.id}
              width={345}
              title={request.username}
              content={request.email}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Requests;
