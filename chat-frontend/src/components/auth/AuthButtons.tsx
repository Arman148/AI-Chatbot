import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../ui/button/Button";
import "./style.css";

const AuthButtons: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  if (isLoading) return null;

  const displayName =
    user?.name?.trim() ||
    user?.given_name?.trim() ||
    user?.nickname?.trim() ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <div className="auth-buttons-wrapper">
      {!isAuthenticated ? (
        <Button
          variant="auth-glass"
          onClick={() => loginWithRedirect()}
          className="auth-main-btn"
        >
          Log in
        </Button>
      ) : (
        <div className="auth-logged-in">
          <Button
            variant="auth-glass"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="auth-main-btn"
          >
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
