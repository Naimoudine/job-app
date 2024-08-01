import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import OffersPage, { loader as offersLoader } from "./pages/OffersPage.jsx";
import SignIn, { action as signInAction } from "./pages/SignIn.jsx";
import SignUp, { action as signUpAction } from "./pages/SignUp.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/offers",
        element: <OffersPage />,
        loader: offersLoader,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
    action: signInAction,
    errorElement: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    action: signUpAction,
    errorElement: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
