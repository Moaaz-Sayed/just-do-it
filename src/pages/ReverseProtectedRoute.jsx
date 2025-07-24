import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ReverseProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user) return <Navigate to="/todos" replace />;

  return children;
}

export default ReverseProtectedRoute;
