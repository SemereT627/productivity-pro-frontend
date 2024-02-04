import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { Suspense, lazy } from "react";

const Loadable =
  (Component: React.ComponentType) => (props: Record<string, unknown>) => {
    return (
      <Suspense fallback={<>Loading...</>}>
        <Component {...props} />
      </Suspense>
    );
  };

export default function Router() {
  return useRoutes([
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "/dashboard", element: <Navigate to="/dashboard/stats" /> },
        { path: "stats", element: <DashboardStatPage /> },
        { path: "songs", element: <DashboardSongPage /> },
        { path: "artists", element: <DashboardArtistPage /> },
      ],
    },
    {
      path: "*",
      children: [
        { path: "404", element: <NotFoundPage /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}

const DashboardStatPage = Loadable(
  lazy(() => import("../pages/dashboard/DashboardStatPage"))
);
const DashboardSongPage = Loadable(
  lazy(() => import("../pages/dashboard/DashboardSongPage"))
);
const DashboardArtistPage = Loadable(
  lazy(() => import("../pages/dashboard/DashboardArtistPage"))
);

const NotFoundPage = Loadable(
  lazy(() => import("../pages/error/NotFoundPage"))
);
