import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false, // Default to light mode
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: "theme-storage",
    },
  ),
);
