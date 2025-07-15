'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Test user data
const TEST_USER = {
  id: 1,
  email: 'admin@anginat.com',
  username: 'admin',
  role: 'admin',
  name: 'Admin User'
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check test credentials
      if (email === 'admin@anginat.com' && password === 'admin@12345') {
        setUser(TEST_USER);
        localStorage.setItem('user', JSON.stringify(TEST_USER));
        return { success: true, data: TEST_USER };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (err) {
        console.error('Error parsing saved user data:', err);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
    setIsInitialized(true);
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 