import { RegisterUser } from "~/interfaces/register.interface";
import http from "~/utils/http";

const userUrl = `/users`;

export const createUser = async (formData: RegisterUser) => {
  const data = await http.post(userUrl, formData);

  return data;
};

export const getMe = async () => {
  const { data } = await http.get("/users/me");

  return data;
};

export const getUsersById = async (id: number) => {
  const { data } = await http.get(`/users/${id}`);

  return data;
};
