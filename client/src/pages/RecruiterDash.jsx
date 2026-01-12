import React, { useState } from "react";
import Sidebar from "../components/RecruiterDashboard/Sidebar";
import Overview from "../components/RecruiterDashboard/Overview";
import Profile from "../components/RecruiterDashboard/Profile";
import Applicant from "../components/RecruiterDashboard/Applicant";
import Jobs from "../components/RecruiterDashboard/Jobs";


const RecruiterDashbaord = () => {
  const [active, setActive] = useState("overview");
  return (
    <>
      <div className="flex h-[91vh]">
        <div className="w-3/17 ">
          <Sidebar active={active} setActive={setActive} />
        </div>
        <div className="w-14/17 h-full overflow-y-auto">
          {active === "overview" && <Overview />}
          {active === "profile" && <Profile />}
          {active === "jobs" && <Jobs />}
          {active === "applicant" && <Applicant />}
        </div>
      </div>
    </>
  );
};

export default RecruiterDashbaord;