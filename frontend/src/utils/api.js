import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const setupInterceptors = (getAccessTokenSilently) => {
  api.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const getUser = async (auth0Id) => {
  const response = await api.get(`/users/${auth0Id}`);
  return response.data;
};

export const createOrUpdateUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await api.get('/users/leaderboard');
  return response.data;
};

export const recordActivity = async (activityData) => {
  const response = await api.post('/activities', activityData);
  return response.data;
};

export const getUserActivities = async (userId) => {
  const response = await api.get(`/activities/user/${userId}`);
  return response.data;
};

export const getOceanHealthData = async () => {
  const response = await api.get('/ocean-health');
  return response.data;
};

export default api;