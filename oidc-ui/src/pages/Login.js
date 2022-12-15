import React from "react";
import Background from "../components/Background";
import Login from "../components/Login";
import clientService from "../services/clientService";
import langConfigService from "../services/langConfigService";

export default function LoginPage() {
  return (
    <Background
      langConfigService={langConfigService}
      component={React.createElement(Login, {
        clientService: clientService,
      })}
    />
  );
}
