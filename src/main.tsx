import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./routes/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./globals.css";
import Root from "./routes/root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
