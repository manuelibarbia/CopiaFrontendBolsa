import React from "react";
import "./SignInCard.css";

const SignInCard = ({ children }) => {
  return <li className="register-option-container">{children}</li>;
};

export default SignInCard;