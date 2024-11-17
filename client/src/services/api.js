import axios from "axios";

// const API_URL = "http://localhost:8080/api";
const API_URL = "https://living-things-vq56.onrender.com/api";

let token = localStorage.getItem("token");

export const setToken = (userToken) => {
  token = userToken;
  localStorage.setItem("token", userToken); // Save to localStorage for persistence
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const registerUser = async (username, password) => {
  return await axios.post(`${API_URL}/auth/register`, { username, password });
};

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  setToken(response.data.token); // Store token after login
  return response.data;
};

export const logChartAccess = async (logData) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.post(`${API_URL}/logs`, logData, { headers });
  return response.data;
};

export const getChartLogs = async () => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get(`${API_URL}/logs`, { headers });
  return response.data;
};

export const getFilteredChartData = async ({
  startDate,
  endDate,
  algo_status,
}) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // Add filtering params, including algo_status
  const params = {
    startDate,
    endDate,
    algo_status: algo_status !== undefined ? algo_status : "", // Include algo_status based on selection
  };

  try {
    // Make the GET request to the backend with the appropriate filters
    const response = await axios.get(`${API_URL}/consumption/filter`, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered chart data:", error);
    throw error;
  }
};
