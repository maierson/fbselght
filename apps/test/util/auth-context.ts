import { Context, createContext, useContext } from "react";
import { AuthUser } from "./auth-user";

export type Maybe<T> = T | undefined | null;
export interface AuthContextValues {
  authUser: Maybe<AuthUser>;
  logout: () => void;
}

export const AuthContext: Context<AuthContextValues> = createContext({
  authUser: null,
} as AuthContextValues);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    console.error(
      "useAuthContext() must be used inside an AuthContext provider",
    );
  }
  return context;
}
