import { create } from "zustand";

export const useCodeStore = create((set) => ({
  showStats: false,
  showMap: false,
  isSmall: false, // Estado para cambiar el tamaño de la card
  toggleStats: () =>
    set((state) => ({ showStats: !state.showStats, isSmall: !state.isSmall })),
  toggleMapAndStats: () =>
    set((state) => ({
      showMap: !state.showMap,
      showStats: !state.showStats,
      isSmall: !state.isSmall,
    })),
}));
