import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <GoogleOAuthProvider clientId="575735354732-a1phvefjqu6a2kulnrp0c659ck10inmh.apps.googleusercontent.com"> */}
        <App />
      {/* </GoogleOAuthProvider> */}
    </BrowserRouter>
  </StrictMode>
)
