import React, { useState, useEffect } from "react";
import OpenChats from "./ConversationList";
import ActiveChat from "./ActiveChat";
import { getUserById, createNewGroup, createNewChat } from "../utils/api";
import { useAppContext } from "../utils/context/AppContext";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Chat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, users, setConversationId, setConversationName } =
    useAppContext();

  useEffect(() => {
    if (!userId) {
      // Redirect to login if userId is not set
      navigate("/");
    } else {
      fetchUsers();
    }
    // eslint-disable-next-line
  }, [userId, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await getUserById(userId);
      setIsLoading(false);
      setUser(response.data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleCreatePersonalChat = async (selectedUserId) => {
    const usersArray = [selectedUserId];
    try {
      const response = await createNewChat(userId, usersArray);
      const newConversationId = response.data.data.id;
      setConversationId(newConversationId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateGroupChat = async (selectedUserIds, groupName) => {
    try {
      const response = await createNewGroup(userId, selectedUserIds, groupName);
      const newConversationId = response.data.data.id;
      setConversationId(newConversationId);
      setConversationName(response.data.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    !isLoading && (
      <div className="h-screen flex flex-col">
        <Header username={user.data.name} />
        <div className=" bg-gray-200 flex flex-row flex-1">
          <div className=" overflow-auto h-[85vh]  flex flex-col w-1/3 border-r border-gray-300  bg-gray-100">
            <Modal
              onCreatePersonalChat={handleCreatePersonalChat}
              onCreateGroupChat={handleCreateGroupChat}
              users={users}
            />
            <OpenChats />
          </div>

          <ActiveChat />
        </div>
      </div>
    )
  );
};

export default Chat;
