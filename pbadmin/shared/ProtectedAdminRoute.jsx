import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminAuthContext from "./AdminAuthContext";

const ProtectedAdminRoute = ({ children, accessBy }) => {
  const { admin } = useContext(AdminAuthContext);

  if (accessBy === "non-authenticated") {
    if (!admin) {
      return children;
    }
    return <Navigate to="/admin/dashboard"></Navigate>;
  } else if (accessBy === "authenticated") {
    if (admin) {
      return children;
    }
    return <Navigate to="/admin/login"></Navigate>;
  }
};
export default ProtectedAdminRoute;
