import React from "react";
import Background from "../components/Background";
import Registration from "../components/Registration";
import clientService from "../services/clientService";
import oidcService from "../services/oidcService";

export default function RegistrationPage({ langOptions }) {
  return (
    <Background
      component={React.createElement(Registration, {
        clientService: clientService,
        oidcService: oidcService,
      })}
      langOptions={langOptions}
    />
  );
}
