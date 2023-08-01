import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { pollUserConversations } from "../utils/api";
import { useAppContext } from "../utils/context/AppContext";

const ConversationList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

  const { userId } = useAppContext();

  useEffect(() => {
    // Poll user conversations using the pollUserConversations function
    const stopPolling = pollUserConversations(userId, (userConversations) => {
      setIsLoading(false);
      setConversations(userConversations);
    });

    // Clean up the interval on unmount
    return () => stopPolling();
  }, [userId]);

 
  // Filter unique conversation names
  const uniqueConversations = conversations.reduce(
    (uniqueSet, conversation) => {
      const chatName =
        conversation.name ||
        conversation.members.filter(({ id }) => id !== userId)[0].name;
      uniqueSet.add(chatName);
      return uniqueSet;
    },
    new Set()
  );

  return (
    <div className="flex flex-col justify-between items-center gap-2 p-4 bg-gray-100 ">
      <h3 className="text-gray-900 uppercase">
        All Conversations - {Array.from(uniqueConversations).length}{" "}
      </h3>
      {!isLoading &&
        Array.from(uniqueConversations).map((chatName) => {
          const conversationId = conversations.find((conversation) => {
            const name =
              conversation.name ||
              conversation.members.filter(({ id }) => id !== userId)[0].name;
            return name === chatName;
          }).id;

          return (
            <Conversation
              key={conversationId}
              name={chatName}
              id={conversationId}
            />
          );
        })}
    </div>
  );
};

export default ConversationList;
