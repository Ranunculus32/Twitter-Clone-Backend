// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label>Password:</label>
      <input
        type="password"
        className="form-control"
        placeholder="Enter your password"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PasswordInput;