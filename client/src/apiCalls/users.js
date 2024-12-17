import { axiosInstance } from ".";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const getLoggedUser = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiEndpoint}/user/get-logged-user`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiEndpoint}/user/get-all-users`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
