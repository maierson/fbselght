import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { AuthContext, Maybe } from "./auth-context";
import { AuthUser } from "./auth-user";
import { auth, logoutFirebase } from "./firebase-client";



let emailVerificationSent = false;

export interface AuthProviderProps {
  requireVerified?: boolean;
  children?;
}

/**
 * Top level provider that makes the auth user available throught the app.
 */
export function AuthProvider({
  children,
  requireVerified = false,
}: AuthProviderProps) {
  /**
   * Starting with user undefined here to indicate that the login attempt
   * has not beeen excuted yet. After set the user to null to indicate that
   * we tried to login but were unsuccessful or apply the user if we are
   * logged in.
   */
  const [authUser, setAuthUser] = useState<Maybe<AuthUser>>();

  const logout = useCallback(() => {
    return logoutFirebase().then(() => {
      setAuthUser(null);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: AuthUser | null) => {
      if (user) {
        if (requireVerified && !user.emailVerified && !emailVerificationSent) {
          emailVerificationSent = true;
          alert(
            "You must verify your email before logging in. We are sending you an email verification now.",
          );
          sendEmailVerification(user);
          logout();
          return;
        }
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => !!unsubscribe && unsubscribe();
  }, [logout, requireVerified]);

  return (
    <AuthContext.Provider value={{ authUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
