import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_ROLES, getDemoUserByRole } from '../data/demoUsers';
import { storageService } from '../services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => storageService.getCurrentUser());
  const [currentRole, setCurrentRole] = useState(() => currentUser?.role || 'citizen');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    storageService.initializeData();
  }, []);

  const switchRole = (roleId) => {
    const demoUser = getDemoUserByRole(roleId);
    setCurrentUser(demoUser);
    setCurrentRole(roleId);
    setIsAuthenticated(true);
    storageService.saveCurrentUser(demoUser);
  };

  const login = (roleId, customDetails = {}) => {
    const baseUser = getDemoUserByRole(roleId);
    const updatedUser = { 
      ...baseUser, 
      ...customDetails,
      isRegistered: customDetails.isRegistered !== undefined ? customDetails.isRegistered : true 
    };
    setCurrentUser(updatedUser);
    setCurrentRole(roleId);
    setIsAuthenticated(true);
    storageService.saveCurrentUser(updatedUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateUserProfile = (updates) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    storageService.saveCurrentUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated,
        switchRole,
        login,
        logout,
        updateUserProfile,
        availableRoles: DEMO_ROLES
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
