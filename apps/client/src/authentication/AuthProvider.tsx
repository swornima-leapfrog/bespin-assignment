import { PropsWithChildren, useEffect, useState } from "react";
import { User } from "~/interfaces/user.interface";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "~/services/users";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const { data, isSuccess, isFetching, isLoading } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMe
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [data, isSuccess]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading || isFetching ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
