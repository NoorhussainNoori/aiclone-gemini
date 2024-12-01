import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Chatbox from "./Components/Chatbox/Chatbox";
import Login from "./Components/Login/Login";
// import { auth } from "./firebaseConfig";
// const AuthGuard = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

const RouterList = () => {
  return (
    <Routes>
      {/* Protecting the Chatbox route with AuthGuard */}
      <Route path="" element={<App />}>
        <Route
          path="/"
          element={
            // <AuthGuard>
            <Chatbox />
            // </AuthGuard>
          }
        />
      </Route>

      {/* Login Route */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RouterList;
