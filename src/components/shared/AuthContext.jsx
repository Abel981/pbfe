import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      await axios
        .get("https://localhost:3000/agents/profile", { withCredentials: true })
        .then((res) => {
          setUser(res.data);
          setIsLoading(false);
          // navigate("/admin/dashboard");
        })
        .catch((err) => setIsLoading(false));
    }
    fetchUser();
  }, []);
  const navigate = useNavigate();
  const login = async (payload) => {
    console.log(payload.username);
    await axios
      .post("https://localhost:3000/agents/login", payload, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        // localStorage.setItem("userProfile", JSON.stringify(res.data));
        setUser(res.data);
        navigate("/agent/dashboard");
      });
    // let apiResponse = await axios.get("http://localhost:3000/profile", {
    //   withCredentials: true,
    // });
    // console.log(apiResponse)
  };

  const logout = async () => {
    await axios.get("https://localhost:3000/agents/logout", {
      withCredentials: true,
    });
    setUser(null);
    navigate("/agent/login");
  };
  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
