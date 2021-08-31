
import { Context, createContext, useContext } from "react";
import { Maybe } from "../util/auth-context";
import { User } from "./user";

export interface UserContextValues {
  user: Maybe<User>;
  isLoading: boolean;
}

export const UserContext: Context<UserContextValues> = createContext({
  user: null,
  isLoading: false,
} as UserContextValues);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within the InventoryDoContextProvider",
    );
  }
  return context;
}
