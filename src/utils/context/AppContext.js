import React, { useContext, createContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [conversationName, setConversationName] = useState(null);
  return (
    <AppContext.Provider
      value={{
        conversationId,
        setConversationId,
        userId,
        setUserId,
        users,
        setUsers,
        conversationName,
        setConversationName
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within the AppContextProvider');
  }
  return context;
};
