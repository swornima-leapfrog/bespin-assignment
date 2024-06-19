import http from "~/utils/http";

export interface GetFriends {
  id: number;
  username: string;
  email: string;
  password: string;
}
export const getFriends = async () => {
  const { data } = await http.get("/friends");
  return data;
};

export const getRecommendations = async () => {
  const { data } = await http.get("/friends/recommend");

  return data;
};

export const addFriend = async (targetUserId: number) => {
  const { data } = await http.post("/friends/request", { targetUserId });

  return data;
};

export const getRequests = async () => {
  const { data } = await http.get("/friends/request");

  return data;
};

export const getSentRequests = async () => {
  const { data } = await http.get("/friends/request/sent");

  return data;
};

export const searchByName = async (name: string) => {
  const { data } = await http.get(`/users/search/${name}`);
  return data;
};

export const acceptRequest = async (targetUserId: number) => {
  const { data } = await http.post("/friends/accept", {
    targetUserId
  });

  return data;
};

export const rejectRequest = async (targetUserId: number) => {
  const { data } = await http.post("/friends/reject", {
    targetUserId
  });

  return data;
};
