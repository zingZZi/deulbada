import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://43.201.70.73',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
