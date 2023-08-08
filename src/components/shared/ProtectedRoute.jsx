import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";
 
const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = useContext(AuthContext);
 
  if (accessBy === "non-authenticated") {
    if (!user) {
      return children;
    }
    return <Navigate to="/agent/dashboard"></Navigate>;
   
  } else if (accessBy === "authenticated") {
    if (user) {
      return children;
    }
    return <Navigate to="/agent/login"></Navigate>;
  }

};
export default ProtectedRoute