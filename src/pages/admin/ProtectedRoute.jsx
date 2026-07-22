import { Navigate } from "react-router-dom";
import { getToken } from "../../lib/api";

// Guards admin routes: redirects to the login page when no token is present.
const ProtectedRoute = ({ children }) => {
  if (!getToken()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
