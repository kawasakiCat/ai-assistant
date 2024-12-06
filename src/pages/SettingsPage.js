import React from "react";
import Settings from "../features/settings/components/Settings";
import Navigation from "../components/Navigation/Navigation";

const SettingsPage = () => {
  return (
    <div>
      <Navigation />
      <h1>設定</h1>
      <Settings />
    </div>
  );
};

export default SettingsPage;
