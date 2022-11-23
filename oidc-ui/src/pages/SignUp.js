import React from "react";
import Background from "../components/Background";
import SignUp from "../components/SignUp";

export default function SignUpPage() {
  return <Background component={React.createElement(SignUp)} />;
}
