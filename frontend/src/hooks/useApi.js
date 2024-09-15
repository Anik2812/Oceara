import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use(async (config) => {
    try {
      const token = await getAccessTokenSilently();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error('Error getting access token:', error);
    }
    return config;
  });

  const getUser = async (auth0Id) => {
    const response = await api.get(`/users/${auth0Id}`);
    return response.data;
  };

  const createOrUpdateUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  };

  const getLeaderboard = async () => {
    const response = await api.get('/users/leaderboard');
    return response.data;
  };

  const recordActivity = async (activityData) => {
    const response = await api.post('/activities', activityData);
    return response.data;
  };

  const getUserActivities = async (userId) => {
    const response = await api.get(`/activities/user/${userId}`);
    return response.data;
  };

  return {
    getUser,
    createOrUpdateUser,
    getLeaderboard,
    recordActivity,
    getUserActivities,
  };
};