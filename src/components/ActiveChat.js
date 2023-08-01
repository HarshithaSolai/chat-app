import React, { useState, useEffect, useRef } from "react";
import { sendMessage, getMessage } from "../utils/api"; // Import your API functions here
import { useAppContext } from "../utils/context/AppContext";
import { getNameById } from "../utils/helper";

const ActiveChat = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const { users, userId, conversationId, conversationName } = useAppContext();
  const messagePollingIntervalRef = useRef(null);

  useEffect(() => {
    refreshActiveChat();
    messagePollingIntervalRef.current = setInterval(refreshActiveChat, 5000); // Polling interval of 5 seconds

    // Clean up the interval when the component is unmounted or conversation changes
    return () => clearInterval(messagePollingIntervalRef.current);
    // eslint-disable-next-line
  }, [conversationId]);

  const refreshActiveChat = async () => {
    if (conversationId) {
      const messagesResponse = await getMessage(userId, conversationId);
      setMessages(messagesResponse.data.data.reverse());
    }
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await sendMessage(userId, conversationId, inputValue);
    setInputValue("");
    refreshActiveChat();
  };

  return (
    <main className="w-2/3 flex flex-col justify-center">
      {conversationId ? (
        <>
          <div className="h-[10vh] w-full text-center font-bold text-xl px-4 py-4 bg-gray-100 whitespace-nowrap overflow-hidden truncate border-b-2 border-gray-200">
            <strong>Conversation with {conversationName}</strong>
            <br />
          </div>
          <div className="mb-5 h-[60vh] overflow-auto flex flex-col">
            {messages.map((message) => (
              <div
                key={message.user_id}
                className={`chat-message-${
                  message.user_id === userId ? "right" : "left"
                } w-1/2 p-2 bg-gray-100 rounded-10 m-5 break-words`}
              >
                <p className="text-blue-700 text-sm font-bold">
                  {getNameById(users, message.user_id)}
                </p>
                {message.text}
                <p className="text-gray-400 text-xs">
                  {new Date(message.sent_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                className="pl-6 py-2 md:py-4 focus:outline-none w-full"
                placeholder="send a message..."
                value={inputValue}
                onChange={onInputChange}
              />

              <button
                className="bg-yellow-500 hover:bg-yellow-600 rounded  p-2 md:p-4 text-white uppercase"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          {" "}
          <p>
            Click on any conversation to view chat history and send messages{" "}
          </p>{" "}
        </div>
      )}
    </main>
  );
};

export default ActiveChat;
