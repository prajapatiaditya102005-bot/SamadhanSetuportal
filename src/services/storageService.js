// Local Storage and Mock API persistence layer for Samadhan Setu
import { INITIAL_CHALLENGES } from '../data/sampleChallenges';
import { DEMO_ROLES, getDemoUserByRole } from '../data/demoUsers';

const STORAGE_KEYS = {
  CHALLENGES: "samadhan_setu_challenges_v1",
  CURRENT_USER: "samadhan_setu_user_v2",
  NOTIFICATIONS: "samadhan_setu_notifications_v1"
};

export const storageService = {
  // Initialize sample data if not already present
  initializeData() {
    try {
      const existing = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
      if (!existing) {
        localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(INITIAL_CHALLENGES));
      }
      
      const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (!user) {
        // Default to citizen for initial landing if not set
        const defaultUser = getDemoUserByRole("citizen");
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
      }
    } catch (e) {
      console.warn("LocalStorage access failed:", e);
    }
  },

  // Get all challenges
  getChallenges() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
      return data ? JSON.parse(data) : INITIAL_CHALLENGES;
    } catch (e) {
      return INITIAL_CHALLENGES;
    }
  },

  // Save all challenges
  saveChallenges(challenges) {
    try {
      localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
    } catch (e) {
      console.error("Failed to save challenges:", e);
    }
  },

  // Reset to default sample data
  resetChallenges() {
    try {
      localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(INITIAL_CHALLENGES));
      return INITIAL_CHALLENGES;
    } catch (e) {
      return INITIAL_CHALLENGES;
    }
  },

  // Get current logged-in user
  getCurrentUser() {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return user ? JSON.parse(user) : getDemoUserByRole("citizen");
    } catch (e) {
      return getDemoUserByRole("citizen");
    }
  },

  // Save logged-in user
  saveCurrentUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save user:", e);
    }
  },

  // Get all registered citizen accounts
  getRegisteredCitizens() {
    try {
      const list = localStorage.getItem("samadhan_registered_citizens_v1");
      return list ? JSON.parse(list) : [];
    } catch (e) {
      return [];
    }
  },

  // Save a new registered citizen profile
  saveRegisteredCitizen(citizen) {
    try {
      const list = this.getRegisteredCitizens();
      const existingIdx = list.findIndex(c => 
        (c.email && citizen.email && c.email.toLowerCase() === citizen.email.toLowerCase()) || 
        (c.phone && citizen.phone && c.phone.replace(/\D/g, '') === citizen.phone.replace(/\D/g, '')) || 
        (c.name && citizen.name && c.name.toLowerCase() === citizen.name.toLowerCase())
      );
      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...citizen };
      } else {
        list.push(citizen);
      }
      localStorage.setItem("samadhan_registered_citizens_v1", JSON.stringify(list));
    } catch (e) {
      console.error("Failed to save registered citizen:", e);
    }
  }
};
