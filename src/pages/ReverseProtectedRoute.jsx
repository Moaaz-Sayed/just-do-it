import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../ui/Spinner";

function ReverseProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (user) return <Navigate to="/todos" replace />;

  return children;
}

export default ReverseProtectedRoute;
