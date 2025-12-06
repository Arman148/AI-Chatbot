import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../ui/button/Button";
import "./style.css";

const AuthButtons: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  if (isLoading) return null;

  return (
    <div className="auth-buttons-wrapper">
      {!isAuthenticated ? (
        <Button
          variant="glass"
          onClick={() => loginWithRedirect()}
          className="auth-main-btn"
        >
          Log In / Register
        </Button>
      ) : (
        <div className="auth-logged-in">
          <Button
            variant="glass"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="auth-main-btn"
          >
            Log Out
          </Button>
          <div className="auth-user">
            <span>Signed in as:</span>
            <span style={{ fontWeight: "bold", marginLeft: "0.5rem" }}>
              {user?.email || user?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
