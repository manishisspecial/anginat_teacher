// AuthService.js - Authentication service for handling login, tokens, and user data

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Token management
export const saveTokenInLocalStorage = (tokenData) => {
  try {
    localStorage.setItem('accessToken', tokenData.accessToken);
    localStorage.setItem('refreshToken', tokenData.refreshToken);
    localStorage.setItem('tokenExpiry', tokenData.expiresIn);
    localStorage.setItem('tokenTimestamp', Date.now().toString());
  } catch (error) {
    console.error('Error saving tokens to localStorage:', error);
  }
};

export const getStoredTokens = () => {
  try {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      tokenExpiry: localStorage.getItem('tokenExpiry'),
      tokenTimestamp: localStorage.getItem('tokenTimestamp')
    };
  } catch (error) {
    console.error('Error getting tokens from localStorage:', error);
    return null;
  }
};

export const clearAuthData = () => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('tokenTimestamp');
    localStorage.removeItem('userData');
    localStorage.removeItem('institutionData');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Token expiry check
export const checkTokenExpiry = () => {
  try {
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const accessToken = localStorage.getItem('accessToken');

    if (!tokenTimestamp || !tokenExpiry || !accessToken) {
      return false;
    }

    const currentTime = Date.now();
    const tokenTime = parseInt(tokenTimestamp);
    const expiryTime = parseInt(tokenExpiry) * 1000; // Convert to milliseconds

    return (currentTime - tokenTime) < expiryTime;
  } catch (error) {
    console.error('Error checking token expiry:', error);
    return false;
  }
};

// API request helper
const makeApiRequest = async (endpoint, options = {}) => {
  const accessToken = localStorage.getItem('accessToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
  };

  const config = {
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Authentication methods
export const login = async (email, password) => {
  const response = await makeApiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  return response;
};

export const getCurrentUser = async () => {
  const response = await makeApiRequest('/auth/get-user');
  
  // Store user data in localStorage
  if (response.data && response.data.status === 'success') {
    try {
      localStorage.setItem('userData', JSON.stringify(response.data.data));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }
  
  return response;
};

export const getInstitutionDetails = async () => {
  try {
    const response = await makeApiRequest('/auth/institution-details');
    
    // Store institution data in localStorage
    if (response.data && response.data.status === 'success') {
      localStorage.setItem('institutionData', JSON.stringify(response.data.data));
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching institution details:', error);
    throw error;
  }
};

// Auto login check
export const checkAutoLogin = () => {
  const hasValidTokens = checkTokenExpiry();
  const userData = localStorage.getItem('userData');
  
  if (hasValidTokens && userData) {
    const tokenTimestamp = parseInt(localStorage.getItem('tokenTimestamp'));
    const tokenExpiry = parseInt(localStorage.getItem('tokenExpiry')) * 1000;
    const timeUntilExpiry = (tokenTimestamp + tokenExpiry) - Date.now();
    
    return {
      shouldLogin: true,
      timer: Math.max(timeUntilExpiry, 0)
    };
  }
  
  return {
    shouldLogin: false,
    timer: 0
  };
};

// Logout timer
export const runLogoutTimer = (duration, logoutCallback) => {
  if (duration > 0) {
    setTimeout(() => {
      logoutCallback();
    }, duration);
  }
};

// Error formatting
export const formatError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.statusText;
    return message;
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred.';
  }
};

// Get stored user data
export const getStoredUserData = () => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting stored user data:', error);
    return null;
  }
};

// Get stored institution data
export const getStoredInstitutionData = () => {
  try {
    const institutionData = localStorage.getItem('institutionData');
    return institutionData ? JSON.parse(institutionData) : null;
  } catch (error) {
    console.error('Error getting stored institution data:', error);
    return null;
  }
}; 