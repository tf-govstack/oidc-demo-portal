import React from "react";
import Background from "../components/Background";
import UserProfile from "../components/UserProfile";

export default function UserProfilePage() {
  return <Background component={React.createElement(UserProfile)} />;
}
