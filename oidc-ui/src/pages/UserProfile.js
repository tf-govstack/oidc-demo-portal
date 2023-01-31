import React from "react";
import Background from "../components/Background";
import UserProfile from "../components/UserProfile";
import oidcService from "../services/oidcService";

export default function UserProfilePage({ langOptions }) {
  return (
    <Background
      component={React.createElement(UserProfile, {
        oidcService: oidcService,
      })}
      langOptions={langOptions}
    />
  );
}
