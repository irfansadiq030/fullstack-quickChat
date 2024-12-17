import { axiosInstance } from ".";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiEndpoint}/chat/get-all-chats`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// ** Create New Chat
export const createNewChat = async (members) => {
  try {
    const response = await axiosInstance.post(
      `${apiEndpoint}/chat/create-new-chat`,
      {
        members
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
