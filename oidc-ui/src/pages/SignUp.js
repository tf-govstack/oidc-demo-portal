import React from "react";
import Background from "../components/Background";
import SignUp from "../components/SignUp";
import clientService from "../services/clientService";
import langConfigService from "../services/langConfigService";

export default function SignUpPage() {
  return (
    <Background
      langConfigService={langConfigService}
      component={React.createElement(SignUp, {
        clientService: clientService,
      })}
    />
  );
}
