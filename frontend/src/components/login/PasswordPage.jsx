// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PasswordInput from "./Password";

// eslint-disable-next-line react/prop-types
const PasswordPage = ({ username, onLogin }) => {
  // Change from email to username
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    onLogin(username, password); // Pass username instead of email
  };

  return (
    <div>
      <h2>Enter Password</h2>
      <PasswordInput value={password} onChange={handlePasswordChange} />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default PasswordPage;