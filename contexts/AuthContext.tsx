import React, { createContext, ReactNode, useContext, useState } from "react";

export interface UserProfile {
  name: string;
  username?: string;
  email: string;
  phone: string;
  avatar: string;
  coverPhoto?: string;
  gender?: string;
  telegram?: string;
  accountType?: string;
  location: string;
  bio: string;
  joinDate: string;
  isVerified: boolean;
  stats: {
    activeAds: number;
    favorites: number;
    views: number;
    rating: number;
  };
}

const DEFAULT_USER: UserProfile = {
  name: "Ban Sreypov",
  username: "bansreypov",
  email: "bansreypov@gmail.com",
  phone: "015 455 758",
  avatar: "",
  coverPhoto: "",
  gender: "Female",
  telegram: "bansreypov",
  accountType: "Normal account",
  location: "Phnom Penh, Cambodia",
  bio: "Marketplace seller & buyer on PsaKhmer",
  joinDate: "Jan 2024",
  isVerified: false,
  stats: {
    activeAds: 0,
    favorites: 3,
    views: 45,
    rating: 5.0,
  },
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile;
  login: (customUser?: Partial<UserProfile>) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  const login = (customUser?: Partial<UserProfile>) => {
    if (customUser) {
      setUser((prev) => ({ ...prev, ...customUser }));
    }
    setIsAuthenticated(true);
  };

  const logout = () => setIsAuthenticated(false);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

