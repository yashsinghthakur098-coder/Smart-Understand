import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserState {
  selectedClass: string | null;
  selectedStream: string | null;
  userName: string;
  userEmail: string;
  isProfileComplete: boolean;
  setSelectedClass: (classValue: string) => void;
  setSelectedStream: (stream: string) => void;
  setUserCredentials: (userName: string, userEmail: string) => void;
  clearUserData: () => void;
  completeProfile: () => void;
}

// Custom storage adapter for AsyncStorage
const asyncStorageAdapter = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value;
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

// Zustand middleware to track hydration
const withHydration = (config: any) => (set: any, get: any, api: any) => {
  return config(
    (args: any) => {
      set(args);
      set({ isHydrated: true });
    },
    get,
    api
  );
};

export const useUserStore = create<UserState & { isHydrated: boolean }>()(
  persist(
    (set) => ({
      selectedClass: null,
      selectedStream: null,
      userName: '',
      userEmail: '',
      isProfileComplete: false,
      isHydrated: false,
      
      setSelectedClass: (classValue: string) => set({ selectedClass: classValue }),
      
      setSelectedStream: (stream: string) => set({ selectedStream: stream }),
      
      setUserCredentials: (userName: string, userEmail: string) => 
        set({ userName, userEmail }),
      
      clearUserData: () => 
        set({ 
          selectedClass: null, 
          selectedStream: null, 
          userName: '', 
          userEmail: '', 
          isProfileComplete: false 
        }),
      
      completeProfile: () => set({ isProfileComplete: true }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        selectedClass: state.selectedClass,
        selectedStream: state.selectedStream,
        userName: state.userName,
        userEmail: state.userEmail,
        isProfileComplete: state.isProfileComplete,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);