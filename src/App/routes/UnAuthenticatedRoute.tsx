import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";

const UnAuthenticatedRoute = () => {
  const { currentUser } = useAuthContext();

  return currentUser ? <Navigate to={"/"} replace={true} /> : <Outlet />;
};

export default UnAuthenticatedRoute;
