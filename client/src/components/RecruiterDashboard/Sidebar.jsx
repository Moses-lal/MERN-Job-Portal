import React from "react";
import { FcHome, FcManager, FcDocument } from "react-icons/fc";
import { GiSuitcase } from "react-icons/gi";
import api from "../../config/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

const navItems = [
  { value: "overview", text: "Overview", icons: <FcHome /> },
  { value: "profile", text: "Profile", icons: <FcManager /> },
  { value: "jobs", text: "Jobs", icons: <GiSuitcase /> },
  { value: "application", text: "Application", icons: <FcDocument /> },
];


const Sidebar = ({ active, setActive }) => {

  const { setuser, setIsLogin ,setIsRecruiter} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      sessionStorage.removeItem("userData");
      setuser("");
      setIsLogin(false);
      setIsRecruiter(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        `Error : ${error.response?.status} | ${error.response?.data?.message}`
      );
    }
  };

  const confirmLogout = async () => {
    toast((t) => (
      <div>
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-4">
          <button
            className="border bg-red-500 py-2 px-4 rounded-lg font-bold text-white"
            onClick={() => {
              toast.dismiss(t.id);
              handleLogout();
            }}
          >
            Yes, Logout
          </button>
          <button
            className="border bg-gray-300 py-2 px-4 rounded-lg font-bold text-black"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  return (
    <>
      <div className="bg-gradient-to-b from-[var(--primary)]  to-[var(--secondary)] h-full p-2 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl border-b-2 text-center text-[var(--text)] font-bold pb-3 pt-3">
            {" "}
            Recruiter Dashboard
          </h1>

          <div className="text-lg ">
            <ul className="p-5 space-y-4">
              {navItems.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex gap-2 items-center p-3 border border-[var(--background)] rounded-lg ${
                    active === item.value
                      ? "bg-[var(--tertiary)]"
                      : "hover:bg-[var(--primary)] text-[var(--text)]"
                  }`}
                  onClick={() => setActive(item.value)}
                >
                  {item.icons} {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-[var(--text)] text-center p-2 ">
          <button
            className="border bg-red-500 py-2 px-4 rounded-lg font-bold text-white mt-1"
            onClick={confirmLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;