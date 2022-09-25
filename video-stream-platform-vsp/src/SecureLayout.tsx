import React, { useContext,ReactNode } from "react";
import { UserContext } from "./ContextAPI/UserContext";
import { Navigate, useLocation } from "react-router-dom";

interface IProposSecureLayout {
  children: ReactNode;
}

const SecureLayout = ({ children }: IProposSecureLayout) => {
  let location = useLocation();

  const [userstate, setState] = useContext(UserContext);

  return userstate?.user ? (
    <> {children}</>
  ) : (

    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default SecureLayout;
