import React, { useEffect, useState } from "react";
import logo from "../assets/BunqLogo.svg";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../utils/api";
import { useAppContext } from "../utils/context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const { setUserId } = useAppContext();
  const { users, setUsers } = useAppContext();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers(); // Use the getAllUsers function here
      setUsers(response.data.data);
    } catch (error) {
      setError(error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.name === username);
    if (user) {
      setUserId(user.id);
      navigate("/chat");
    } else {
      setError(true);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl">
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 md:p-8">
          <img src={logo} className="bung-logo" alt="bunq logo"></img>
        </div>
        <form className="p-12 md:p-24">
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <input
              type="text"
              id="username"
              className="bg-gray-200 pl-6 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <input
              type="password"
              id="password"
              className="bg-gray-200 pl-6 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="flex items-center mb-6 md:mb-8">
              <p className="text-red-700 italic">Please choose a valid user.</p>
            </div>
          )}
          <button
            className="bg-gradient-to-b from-purple-700 to-purple-900 font-medium p-2 md:p-4 text-white uppercase w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
