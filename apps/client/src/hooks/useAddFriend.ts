import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "~/services/friends";

export const useAddFriend = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addFriend"]
      });
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
      queryClient.invalidateQueries({ queryKey: ["friends", "sentRequests"] });
      queryClient.invalidateQueries({ queryKey: ["search"] });
    }
  });
};
