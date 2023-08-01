import React from "react";
import { useAppContext } from "../utils/context/AppContext";

const Conversation = ({ id, name }) => {
  const { setConversationId, setConversationName } = useAppContext();

  const onClick = () => {
    setConversationId(id);
    setConversationName(name);
  };

  return (
    <div
      className=" w-full text-left px-4 py-4 bg-white hover:bg-gray-200 whitespace-nowrap overflow-hidden truncate border-b-2 border-gray-200 cursor-pointer"
      onClick={onClick}
    >
      <strong>{name}</strong>
      <br />
    </div>
  );
};

export default Conversation;
