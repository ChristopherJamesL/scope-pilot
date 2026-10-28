import { createBrowserRouter, RouterProvider } from "react-router";
import { HealthStatus } from "../features/health";
import { LandingPage } from "../features/landing";
import { PublicLayout } from "../features/layout";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      // Temporary dev route, remove once real pages exist.
      { path: "/health", element: <HealthStatus /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
