import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-[var(--secondary)] p-4 flex items-center">
        <div className="flex items-center mx-20 space-x-2 ">
          <img src={logo} className="w-30 h-25 rounded-2xl object-cover" />
          <h1 className="text-zinc-100 text-3xl ">Hustle SHala</h1>
        </div>

        <div className="flex gap-5 text-white text-xl mx-60 bg-[var(--primary)]/90 border-2 border-[var(--text)] shadow-md shadow-[#c589e8] p-5 rounded-2xl">
          <Link
            to={"/"}
            className="hover:font-medium hover:text-[var(--tertiary)] hover:transition-all 2s "
          >
            Home |
          </Link>
          <Link
            to={"/about"}
            className="hover:font-medium hover:text-[var(--tertiary)] hover:transition-all 2s"
          >
            About{" "}
          </Link>
          <Link
            to={"/contact"}
            className="hover:font-medium hover:text-[var(--tertiary)] hover:transition-all 2s"
          >
            Contact{" "}
          </Link>
          <Link
            to={"/jobs"}
            className="hover:font-medium hover:text-[var(--tertiary)] hover:transition-all 2s"
          >
            Jobs{" "}
          </Link>
          <Link
            to={"/login"}
            className="hover:font-medium hover:text-[var(--tertiary)] hover:transition-all 2s"
          >
            Login{" "}
          </Link>
          <Link
            to={"/register"}
            className="hover:font-medium hover:text-[var(--tertiary)] hover:transition-all 2s"
          >
            Register{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
