import React from "react";
import { Route, Routes } from "react-router-dom";
import { Wrapper } from "../container/Wrapper";
import { AuthRoutes } from "./AuthRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { Login, NotFound, Profile, Register, Routine } from "../pages";

const AppRouter: React.FC = () => {
  return (
    <Wrapper>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route index element={<Routine />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<AuthRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Wrapper>
  );
};

export default AppRouter;
