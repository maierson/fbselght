
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "./auth-context";

// returns true once authenticated or re-routes
// to landing page if not logged in (authUser is null)
export function useAuthenticatedRoute(): boolean {
  const router = useRouter();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser === null) {
      router.push("/");
    }
  }, [authUser, router]);

  return !!authUser;
}