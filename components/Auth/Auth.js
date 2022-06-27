import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export const Auth = (props) => {
  const { onCloseModal, setTitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setTitleModal("Iniciar sesion");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal("Crear nuevo usuario");
    setShowLogin(false);
  };
  return showLogin ? (
    <Login showRegisterForm={showRegisterForm} onCloseModal={onCloseModal} />
  ) : (
    <Register showLoginForm={showLoginForm} />
  );
};
