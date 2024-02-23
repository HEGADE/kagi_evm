import { create } from "zustand";

export const useUIStore = create((set) => ({
  isMenuBarOpen: false,
  setIsMenuBarOpen: () => set((pre) => ({ isMenuBarOpen: !pre.isMenuBarOpen })),
}));
