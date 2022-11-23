import React from "react";
import Background from "../components/Background";
import Login from "../components/Login";

export default function LoginPage() {
  return <Background component={React.createElement(Login)} />;
}
