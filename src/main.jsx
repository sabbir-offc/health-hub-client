import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import { HelmetProvider } from "react-helmet-async";
import SiteTheme from "./utils/Theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AuthProvider from "./Providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <SiteTheme>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SiteTheme>
    </HelmetProvider>
  </React.StrictMode>
);
