import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import OffersPage, { loader as offersLoader } from "./pages/OffersPage.jsx";
import OfferPage, { loader as offerLoader } from "./pages/OfferPage.jsx";
import SignIn, { action as signInAction } from "./pages/SignIn.jsx";
import SignUp, { action as signUpAction } from "./pages/SignUp.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { checkAuth } from "./utils/api.js";

const protectedRoute = (routeConfig) => {
  return {
    ...routeConfig,
    loader: async (args) => {
      const isAllowed = await checkAuth();

      if (!isAllowed) {
        return redirect("/signin");
      }

      if (routeConfig.loader) {
        routeConfig.loader(args);
      }

      return null;
    },
  };
};

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
      {
        path: "/offers/:id",
        element: <OfferPage />,
        loader: offerLoader,
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
