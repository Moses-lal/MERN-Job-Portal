import React, { useState } from "react";
import SideBar from "../components/UserDashboard/Sidebar";
import Overview from "../components/UserDashboard/overview";
import Profile from "../components/UserDashboard/Profile";
import Application from "../components/UserDashboard/application";

const userdash = () => {
  const [active, setactive] = useState("overview");

  return (
    <>
      <div className="h-[91vh] flex">
        <div className="w-4/17 border">
          <SideBar active={active} setActive={setactive} />
        </div>

        <div className="w-15/17 ">
          {active === "overview" && <Overview />}
          {active === "profile" && <Profile />}
          {active === "application" && <Application />}
        </div>
      </div>
    </>
  );
};

export default userdash;
