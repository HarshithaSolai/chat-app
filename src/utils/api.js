import axios from 'axios';

const BASE_URL = 'http://assignment.bunq.com/api';
const CHAT_APP_API_TOKEN = 'Wu0oKghlZ1ODCBNJPueDFLf7tnCD1kM3';
const POLLING_INTERVAL = 5000; // 5 seconds

const $http = axios.create({
  baseURL: BASE_URL,
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the authentication token in the headers
$http.interceptors.request.use(
  (config) => {
    const authToken = process.env.CHAT_APP_API_TOKEN || CHAT_APP_API_TOKEN; 
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllUsers = async () =>$http.get('/user');

export const getUserById = async (id) =>$http.get(`/user/${id}`);

export const getUserConversations = async (id) =>$http.get(`/user/${id}/conversation`);


// Function to fetch user conversations every 5 seconds using polling
export const pollUserConversations = (userId, callback) => {
  const fetchConversations = async () => {
    try {
      const response = await getUserConversations(userId);
      callback(response.data.data);
    } catch (error) {
      console.error('Error fetching user conversations:', error);
    }
  };

  fetchConversations();
  const intervalId = setInterval(fetchConversations, POLLING_INTERVAL);

  // Clean up the interval on unmount 
  return () => clearInterval(intervalId);
};


export const getMessage = async (id, conversationId) =>$http.get(`/user/${id}/conversation/${conversationId}/message`);

export const sendMessage = async (id, conversationId, text) =>$http.post(`/user/${id}/conversation/${conversationId}/message`, {
  text
});

export const createNewChat = async (id, user_ids ) =>$http.post(`/user/${id}/conversation`, {
  user_ids
});

export const createNewGroup = async (id, user_ids, name) =>$http.post(`/user/${id}/conversation`, {
  user_ids,
  name,
});

