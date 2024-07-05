import axios from 'axios';
import { Platform } from 'react-native';

// Adjust the base URL based on the platform
const adjustedBaseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3002' : 'http://localhost:3002';

const axiosInstance = axios.create({
  baseURL: adjustedBaseURL,
  timeout: 10000, // Waiting time for request,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
