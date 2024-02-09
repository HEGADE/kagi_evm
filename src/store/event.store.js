import { create } from "zustand";

export const useEvent = create((set) => ({
  emitted: false,
  emitEvent: () => set({ emitted: true }),
  reset: () => set({ emitted: false }),
}));
