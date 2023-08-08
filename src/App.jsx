import "./App.css";

import {  Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthContextProvider } from "./components/shared/AuthContext";

import ProtectedRoute from "./components/shared/ProtectedRoute";
import ProtectedAdminRoute from "../pbadmin/shared/ProtectedAdminRoute";
import Register from "./components/register";
import AdminDashboard from "../pbadmin/AdminDashboard";
import AdminLogin from "../pbadmin/AdminLogin";
import { AdminAuthContextProvider } from "../pbadmin/shared/AdminAuthContext";
 
function App() {
  return (



    <div className=" h-screen w-screen">


   <AdminAuthContextProvider>
      <AuthContextProvider>
        

        <Routes>
          
        
            <Route path="/" element={<Register />}></Route>
            <Route
              path="agent/login"
              element={
          
                <ProtectedRoute accessBy="non-authenticated">
                  <Login />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/agent/dashboard"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <Dashboard />
                </ProtectedRoute>
              }
              ></Route>
         <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute accessBy="authenticated">

              <AdminDashboard />
            </ProtectedAdminRoute>
          }
          >

         </Route>

         <Route
          path="/admin/login"
          element={
            <ProtectedAdminRoute accessBy="non-authenticated">
              <AdminLogin />
            </ProtectedAdminRoute>
          }
          >

         </Route>
              </Routes>
        
              
      </AuthContextProvider>
    
           </AdminAuthContextProvider>

                </ div>


  );
}
 
export default App;