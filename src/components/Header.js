import React from "react";
import logo from "../assets/BunqLogo.svg";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/context/AppContext";

const Header = ({ username }) => {
  const navigate = useNavigate();
  const { setUserId } = useAppContext();
  const { setConversationId } = useAppContext();

  const handleLogout = () => {
    setUserId(null);
    setConversationId(null);
    navigate("/");
  };

  return (
    <div className="w-full bg-white  shadow-sm">
      <div className="py-4 border-b-[1px]">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <img
              alt="logo"
              className="md:block cursor-pointer "
              height="100"
              width="100"
              src={logo}
            />

            <h2 className="text-xl font-bold">
              Welcome to Bunq Chat, {username} !!!{" "}
            </h2>
            <button
              className="bg-red-700 hover:bg-red-800 rounded font-medium p-2 md:p-4 text-white uppercase"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
