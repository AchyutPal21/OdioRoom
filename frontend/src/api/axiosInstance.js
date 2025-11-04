import axios from "axios";
import { store } from "../store/index";
import { logoutUser, setAccessToken } from "../store/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json" // Fixed typo: was "application/jon"
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor to add access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      const errorCode = error.response.data?.code;
      
      // Only attempt refresh for TOKEN_EXPIRED or generic 401
      if (errorCode && errorCode !== 'TOKEN_EXPIRED' && errorCode !== undefined) {
        // Handle other 401 cases immediately (no refresh attempt)
        handleAuthError(errorCode, error.response.data?.message);
        return Promise.reject(error);
      }

      // If already refreshing, add to queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh token - use axiosInstance for consistent config
        const response = await axiosInstance.post(
          `/auth/refresh`,
          {}
          // withCredentials: true is already set in instance config
        );

        const { accessToken } = response.data; // Fixed: should be accessToken, not token

        // Update store with new access token - use proper action
        store.dispatch(setAccessToken(accessToken));

        // Process queued requests with new token
        processQueue(null, accessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Fixed: was 'api'

      } catch (refreshError) {
        // Refresh token is expired or invalid
        processQueue(refreshError, null);

        // Logout user with proper action
        store.dispatch(logoutUser(refreshError.response?.data?.message || 'Session expired'));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other error statuses
    if (error.response?.status === 403) {
      const errorCode = error.response.data?.code;
      if (errorCode === 'ACCOUNT_DEACTIVATED') {
        handleAuthError(errorCode, error.response.data?.message);
      }
    }

    // For other errors, just reject
    return Promise.reject(error);
  }
);

// Helper function to handle authentication errors
const handleAuthError = (errorCode, message) => {
  const defaultMessages = {
    'NO_TOKEN': 'Please login to continue',
    'INVALID_TOKEN': 'Invalid session. Please login again.',
    'USER_NOT_FOUND': 'Account not found.',
    'ACCOUNT_DEACTIVATED': 'Your account has been deactivated.',
    'PASSWORD_CHANGED': 'Password was changed. Please login again.',
    'TOKEN_VERIFICATION_FAILED': 'Session invalid. Please login again.'
  };

  const errorMessage = message || defaultMessages[errorCode] || 'Authentication failed';

  // Dispatch logout with message
  store.dispatch(logoutUser(errorMessage));

  // Clear any local storage
  localStorage.removeItem('persist:root');
  
  // Redirect to login after a short delay to allow Redux state update
  setTimeout(() => {
    window.location.href = '/login';
  }, 100);
};

export default axiosInstance;