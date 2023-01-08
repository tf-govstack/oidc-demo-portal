import React from "react";
import Background from "../components/Background";
import UserProfile from "../components/UserProfile";
import langConfigService from "../services/langConfigService";
import oidcService from "../services/oidcService";

export default function UserProfilePage() {
  return (
    <Background
      langConfigService={langConfigService}
      component={React.createElement(UserProfile, {
        oidcService: oidcService,
      })}
    />
  );
}
