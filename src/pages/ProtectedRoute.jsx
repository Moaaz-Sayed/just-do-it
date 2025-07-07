import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../ui/Spinner";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
