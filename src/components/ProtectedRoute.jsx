import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSettings } from "../context/SettingsContext.jsx";

export function ProtectedRoute() {
  const { settings } = useSettings();
  const location = useLocation();

  if (!settings) {
    return <Navigate to="/lobby" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
