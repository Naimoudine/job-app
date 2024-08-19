import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import "./index.css";

import App from "./App.jsx";
import HomePage, { loader as homeLoader } from "./pages/HomePage.jsx";
import OffersPage, { loader as offersLoader } from "./pages/OffersPage.jsx";
import OfferPage, {
  action as offerAction,
  loader as offerLoader,
} from "./pages/OfferPage.jsx";
import SignIn, { action as signInAction } from "./pages/SignIn.jsx";
import SignUp, { action as signUpAction } from "./pages/SignUp.jsx";
import { checkAuth } from "./utils/api.js";
import ProfilePage, { loader as profileLoader } from "./pages/ProfilePage.jsx";
import CompaniesPage, {
  loader as companiesLoader,
} from "./pages/CompaniesPage.jsx";
import CompanyPage, { loader as companyLoader } from "./pages/CompanyPage.jsx";
import Connexion, {
  action as connexionAction,
} from "./pages/company/Connexion.jsx";
import DashboardCompany from "./pages/company/DashboardCompany.jsx";

function protectedRoute(routeConfig) {
  return {
    ...routeConfig,
    loader: async (args) => {
      const isAllowed = await checkAuth();

      if (!isAllowed) {
        return redirect("/signin");
      }

      if (routeConfig.loader) {
        return routeConfig.loader(args);
      }

      return null;
    },
  };
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: homeLoader,
      },
      protectedRoute({
        path: "/profile",
        element: <ProfilePage />,
        loader: profileLoader,
      }),
      {
        path: "/offers",
        element: <OffersPage />,
        loader: offersLoader,
      },
      {
        path: "/offers/:id",
        element: <OfferPage />,
        loader: offerLoader,
        action: offerAction,
      },
      {
        path: "/companies",
        element: <CompaniesPage />,
        loader: companiesLoader,
      },
      {
        path: "/companies/:id",
        element: <CompanyPage />,
        loader: companyLoader,
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
  {
    path: "/connexion",
    element: <Connexion />,
    action: connexionAction,
  },
  {
    path: "/company/dashboard",
    element: <DashboardCompany />,
    children: [],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
