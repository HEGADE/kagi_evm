import { create } from "zustand";

export const useTableData = create((set) => ({
  data: {
    loading: true,
    error: null,
    result: [],
  },
  setData: (data) =>
    set((pre) => {
      return {
        data: { ...pre.data, ...data },
      };
    }),
  reset: () => set({ data: { loading: true, error: null, result: [] } }),
}));
