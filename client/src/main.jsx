import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import OffersPage, {loader as offersLoader} from "./pages/OffersPage.jsx";
import OfferPage, {loader as offerLoarder} from "./pages/OfferPage.jsx";

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
        loader: offersLoader
      },
      {
        path: "/offers/:id",
        element: <OfferPage />,
        loader: offerLoarder
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
