import React from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { Usermenu } from "./Usermenu";
import { Profile } from "./Profile";
import { UserSetting } from  "./UserSetting";
import './App.css'; 

export function Routers() {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} exact /> 
        <Route path="/signin" element={<SignIn />} exact /> 
        <Route path="/" element={<Home />} exact /> 
        {auth ? (
          <>                            
            <Route path="/menu" element={<Usermenu />} exact />
            <Route path="/profile" element={<Profile />} exact />
            <Route path="/setting" element={<UserSetting />} exact />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/signin" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
