"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<User>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser({
            ...userData,
            avatarUrl: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to verify session on mount:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuthStatus();
  }, []);

  const signIn = async (email: string, password?: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password: password || "" })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to sign in.");
      }

      const data = await response.json();
      const authenticatedUser: User = {
        ...data.user,
        avatarUrl: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
      };

      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Sign out network error:", error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) {
      throw new Error("Not authenticated");
    }

    setLoading(true);
    // Simulate updating profile in database/state
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        setLoading(false);
        resolve(updatedUser);
      }, 400);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signIn,
        signOut,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
