import React, { useState } from "react";
import "../styles/FormInput.css";

function FormInput({ className, onChange, errorMsg, id, ...inputProps }) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <>
      <input
        className={className}
        {...inputProps}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        focused={focused.toString()}
      />
      {focused === true && <span>{errorMsg}</span>}
    </>
  );
}

export default FormInput;
