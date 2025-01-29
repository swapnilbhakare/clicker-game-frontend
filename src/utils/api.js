import axios from "axios";

// Fetch the API URL from environment variables
import { API_URL } from "./config";

// Create an axios instance for API requests
const api = axios.create({
  baseURL: API_URL,
});

// Fetch user data
export const fetchUserData = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Handle click action
export const handleClick = async (username) => {
  try {
    const response = await api.post(`/users/${username}/click`);
    return response.data;
  } catch (error) {
    console.error("Error handling click:", error);
    throw error;
  }
};
