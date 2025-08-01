import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import LayoutPublic from "@/layouts/LayoutPublic";

import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const LayoutPrivate = lazy(() => import("@/layouts/LayoutPrivate"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense fallback={""}>
        <LayoutPrivate />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={""}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
]);
