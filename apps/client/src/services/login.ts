import { LoginUser } from "~/interfaces/login.interface";
import http from "~/utils/http";

export const login = async (formData: LoginUser) => {
  const data = await http.post(`/auth/login`, formData);

  return data;
};
