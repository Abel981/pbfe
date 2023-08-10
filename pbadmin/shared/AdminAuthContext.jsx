import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminAuthContext = createContext();

export const AdminAuthContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAdmin() {
      await axios
        .get("https://localhost:3000/admin/profile", { withCredentials: true })
        .then((res) => {
          setAdmin(res.data);
          setIsLoading(false);
          // navigate("/admin/dashboard");
        })
        .catch((err) => setIsLoading(false));
    }
    fetchAdmin();
  }, []);
  const navigate = useNavigate();
  const adminLogin = async (payload) => {
    await axios
      .post("https://localhost:3000/auth/login", payload, {
        withCredentials: true,
      })
      .then(async () => {
        // localStorage.setItem("userProfile", JSON.stringify(res.data));
        await axios
          .get("https://localhost:3000/admin/profile", {
            withCredentials: true,
          })
          .then((res) => {
            setAdmin(res.data);
            //  navigate("/admin/dashboard");
          });
      });

    // let apiResponse = await axios.get("http://localhost:3000/profile", {
    //   withCredentials: true,
    // });
    // console.log(apiResponse)
  };

  const adminLogout = async () => {
    await axios.get("https://localhost:3000/auth/logout", {
      withCredentials: true,
    });
    setAdmin(null);
    navigate("admin/login");
  };
  return (
    <>
      <AdminAuthContext.Provider
        value={{ admin, adminLogin, adminLogout, isLoading }}
      >
        {children}
      </AdminAuthContext.Provider>
    </>
  );
};

export default AdminAuthContext;
