import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const AuthPage = ({ setAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <AuthForm isLogin={isLogin} setAuthenticated={setAuthenticated} />
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>
    </div>
  );
};

export default AuthPage;
