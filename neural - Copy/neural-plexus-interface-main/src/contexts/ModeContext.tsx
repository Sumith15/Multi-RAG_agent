// src/contexts/ModeContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { ADMIN_API_URL, USER_API_URL } from "../lib/utils";

type Mode = "ADMIN" | "USER" | null;

interface ModeContextType {
  mode: Mode;
  apiUrl: string;
  selectMode: (selectedMode: Mode) => void;
  logout: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(null);

  // Automatically pick the right API URL based on the mode
  const apiUrl = mode === "ADMIN" ? ADMIN_API_URL : USER_API_URL;

  const selectMode = (selectedMode: Mode) => {
    setMode(selectedMode);
    // Optional: Save to localStorage if you want persistence across reloads
    // localStorage.setItem("appMode", selectedMode);
  };

  const logout = () => {
    setMode(null);
    // localStorage.removeItem("appMode");
  };

  return (
    <ModeContext.Provider value={{ mode, apiUrl, selectMode, logout }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}