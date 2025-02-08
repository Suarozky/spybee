import { create } from "zustand";

export const useCodeStore = create((set) => ({
  showStats: false,
  showMap: false,
  isSmall: false,
  selectedProject: null, // Nuevo estado para el proyecto seleccionado

  // Acción para abrir/cerrar solo las estadísticas
  toggleStats: () =>
    set((state) => ({ 
      showStats: !state.showStats, 
      isSmall: state.showMap ? true : !state.isSmall, // Mantener isSmall si el mapa está abierto
    })),

  // Acción para abrir/cerrar el mapa y las estadísticas juntos
  toggleMapAndStats: () =>
    set((state) => ({
      showMap: !state.showMap,
      showStats: !state.showMap, // Abrir stats solo si el mapa se está abriendo
      isSmall: !state.showMap, // Cambiar isSmall solo si el mapa se está abriendo
    })),

  // Acción para establecer el proyecto seleccionado
  setSelectedProject: (projectTitle) => 
    set((state) => ({
      selectedProject: projectTitle,
      showMap: true,
      showStats: false, // No abrir stats automáticamente al seleccionar un proyecto
      isSmall: true,
    })),
}));