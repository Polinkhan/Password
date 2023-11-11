import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UnAuthenticatedRoute from "./UnAuthenticatedRoute";
// import NotFound from "../../pages/notFound/NotFound";
import Verify from "../pages/verify";
import Home from "../pages/home";

const RootRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<UnAuthenticatedRoute />}>
        <Route path="/verify" element={<Verify />} />
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default RootRouter;
