import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for storage state
interface StorageState {
  [key: string]: any;
}

// Define the type for context methods
interface StorageContextType {
  storage: StorageState;
  setItem: (key: string, value: any) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  loadStorage: () => Promise<void>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  loading: boolean;
}

// Create the Context
const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [storage, setStorage] = useState<StorageState>({});
  const [loading, setLoading] = useState(true);

  // Load all stored values on mount
  const loadStorage = async () => {
    setLoading(true);
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const storedPairs = await AsyncStorage.multiGet(allKeys);
      const storedData = Object.fromEntries(
        storedPairs.map(([key, value]) => [
          key,
          value ? JSON.parse(value) : null,
        ])
      );
      setStorage(storedData);
    } catch (error) {
      console.error("Error loading storage:", error);
    } finally {
      setLoading(false);
    }
  };

  // Store a value in AsyncStorage (handles objects too)
  const setItem = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setStorage((prev) => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Remove a value from AsyncStorage
  const removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      setStorage((prev) => {
        const newStorage = { ...prev };
        delete newStorage[key];
        return newStorage;
      });
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };

  // Add an ID to the favoriteIds array
  const addFavorite = async (id: string) => {
    const currentFavorites: string[] = storage["favoriteIds"] || [];
    if (!currentFavorites.includes(id)) {
      const updatedFavorites = [...currentFavorites, id];
      await setItem("favoriteIds", updatedFavorites);
    }
  };

  // Remove an ID from the favoriteIds array
  const removeFavorite = async (id: string) => {
    const currentFavorites: string[] = storage["favoriteIds"] || [];
    if (currentFavorites.includes(id)) {
      const updatedFavorites = currentFavorites.filter((favId) => favId !== id);
      await setItem("favoriteIds", updatedFavorites);
    }
  };

  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <StorageContext.Provider
      value={{
        storage,
        setItem,
        removeItem,
        addFavorite,
        removeFavorite,
        loadStorage,
        loading,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

// Custom hook to access the storage context
export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context)
    throw new Error("useStorage must be used within a StorageProvider");
  return context;
};
