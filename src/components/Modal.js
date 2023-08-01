import React, { useState } from 'react';
import { useAppContext } from '../utils/context/AppContext';

const Modal = ({ users, onCreatePersonalChat, onCreateGroupChat }) => {
  const { userId } = useAppContext();
  const [showPersonalChatModal, setShowPersonalChatModal] = useState(false);
  const [showGroupChatModal, setShowGroupChatModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [groupName, setGroupName] = useState('');

  const handleCreatePersonalChat = () => {
    setShowPersonalChatModal(false);
    onCreatePersonalChat(selectedUserId);
  };

  const handleCreateGroupChat = () => {
    setShowGroupChatModal(false);
    onCreateGroupChat(selectedUserIds, groupName);
  };

  const handleCheckboxChange = (e) => {
    const userId = e.target.value;
    setSelectedUserIds((prevIds) => {
      const updatedIdsSet = new Set(prevIds);
      
      if (updatedIdsSet.has(userId)) {
        updatedIdsSet.delete(userId);
      } else {
        updatedIdsSet.add(userId);
      }
      return Array.from(updatedIdsSet);
    });
  };

  return (
    <div className="flex justify-between items-center gap-2 p-4 bg-gray-100">
      {/* Button to open the Create New Chat modal */}
      <button
        onClick={() => setShowPersonalChatModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Create New Chat
      </button>

      {/* Create New Chat Modal */}
      {showPersonalChatModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded w-1/2">
            <h2 className="text-2xl mb-4">Select user to start new chat</h2>
            <div className="flex flex-col space-y-4">
              {users.filter((user) => user.id !== userId).map((user) => (
                <label key={user.id} className="flex items-center">
                  <input
                    type="radio"
                    name="user"
                    value={user.id}
                    checked={selectedUserId === user.id}
                    onChange={() => setSelectedUserId(user.id)}
                  />
                  <span className="ml-2">{user.name}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleCreatePersonalChat}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
            >
              Create Chat
            </button>
            <button
              onClick={() => setShowPersonalChatModal(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-4 ml-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Button to open the Create New Group Chat modal */}
      <button
        onClick={() => setShowGroupChatModal(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Create New Group Chat
      </button>

      {/* Create New Group Chat Modal */}
      {showGroupChatModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded w-1/2">
            <h2 className="text-2xl mb-4">Select users to start new group chat</h2>
            <div className="flex flex-col space-y-4">
              {users.filter((user) => user.id !== userId).map((user) => (
                <label key={user.id} className="flex items-center">
                  <input
                    type="checkbox"
                    name="user"
                    value={user.id}
                    checked={selectedUserIds.includes(user.id)}
                    onChange={ 
                      handleCheckboxChange
                    }
                  />
                  <span className="ml-2">{user.name}</span>
                </label>
              ))}
              <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <button
              onClick={handleCreateGroupChat}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded"
            >
              Create Group Chat
            </button>
            <button
              onClick={() => setShowGroupChatModal(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-4 ml-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
