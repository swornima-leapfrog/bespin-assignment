import { Dispatch, SetStateAction, createContext } from "react";
import { User } from "~/interfaces/user.interface";

interface AuthContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {}
});
