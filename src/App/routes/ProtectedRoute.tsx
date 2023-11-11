import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";

const ProtectedRoute = () => {
  // Access the current user and setRedirectTo function from the authentication context.
  const { currentUser } = useAuthContext();

  return currentUser ? <Outlet /> : <Navigate to="verify" replace={true} />;
};

export default ProtectedRoute;
