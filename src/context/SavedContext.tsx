"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { SearchCategory } from "@/types/search";

export interface SavedItem {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  price: string;
  imageSrc: string;
  savedAt: string;
}

interface SavedContextType {
  savedItems: SavedItem[];
  addItem: (item: Omit<SavedItem, "savedAt">) => void;
  removeItem: (id: string) => void;
  isSaved: (id: string) => boolean;
  toggleSaved: (item: Omit<SavedItem, "savedAt">) => void;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("ticketing_saved_items");
    if (stored) {
      try {
        setSavedItems(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem("ticketing_saved_items");
      }
    }
  }, []);

  const save = (items: SavedItem[]) => {
    setSavedItems(items);
    localStorage.setItem("ticketing_saved_items", JSON.stringify(items));
  };

  const addItem = (item: Omit<SavedItem, "savedAt">) => {
    if (savedItems.some(i => i.id === item.id)) return;
    const newItems = [...savedItems, { ...item, savedAt: new Date().toISOString() }];
    save(newItems);
  };

  const removeItem = (id: string) => {
    const newItems = savedItems.filter(i => i.id !== id);
    save(newItems);
  };

  const isSaved = (id: string) => {
    return savedItems.some(i => i.id === id);
  };

  const toggleSaved = (item: Omit<SavedItem, "savedAt">) => {
    if (isSaved(item.id)) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  return (
    <SavedContext.Provider
      value={{
        savedItems,
        addItem,
        removeItem,
        isSaved,
        toggleSaved
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
}
