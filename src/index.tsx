import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
<<<<<<< HEAD

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
=======
import { Auth0Provider } from "@auth0/auth0-react";

const domain =
  process.env.REACT_APP_AUTH0_DOMAIN || "dev-lvljm44pwzw8sf40.us.auth0.com";
const clientId =
  process.env.REACT_APP_AUTH0_CLIENT_ID || "RAFl41lflJVdqkenHgza9pJtM5jzJ4CB";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://localhost:5000/api",
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <App />
    </Auth0Provider>
>>>>>>> 36ed3f57 (chore: update .gitignore and initial commit)
  </React.StrictMode>
);
