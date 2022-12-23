import React from "react";
import Background from "../components/Background";
import Registration from "../components/Registration";
import clientService from "../services/clientService";
import langConfigService from "../services/langConfigService";
import oidcService from "../services/oidcService";

export default function RegistrationPage() {
  return (
    <Background
      langConfigService={langConfigService}
      component={React.createElement(Registration, {
        clientService: clientService,
        oidcService: oidcService,
      })}
    />
  );
}
