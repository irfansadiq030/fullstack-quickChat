import { axiosInstance } from ".";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const signupUser = async (user) => {
  try {
    const response = await axiosInstance.post(
      `${apiEndpoint}/auth/signup`,
      user
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axiosInstance.post(
      `${apiEndpoint}/auth/login`,
      user
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
