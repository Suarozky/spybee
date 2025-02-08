"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Configurar el token de Mapbox globalmente
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3Vhcm96a3kiLCJhIjoiY202dmF2Y25oMDZnZTJrb29sajU2bDhvcCJ9.-2e2MKyQzl4bUUlBSfyBWw";

export default function Map({ projects }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const initialized = useRef(false);

  useEffect(() => {
    // Verificar si el contenedor del mapa existe
    if (!mapContainer.current) return;

    // Solo inicializar el mapa si no existe
    if (!initialized.current) {
      // Crear nuevo mapa
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        center: [-74.5, 40],
        zoom: 11,
      });

      // Agregar controles de navegación
      map.current.addControl(new mapboxgl.NavigationControl());

      initialized.current = true;

      // Manejar errores del mapa
      map.current.on("error", (e) => {
        console.error("Error en el mapa:", e);
      });
    }

    // Función para actualizar marcadores
    const updateMarkers = () => {
      // Limpiar marcadores existentes
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];

      if (!projects || projects.length === 0) {
        console.log("No hay proyectos para mostrar");
        return;
      }

      const bounds = new mapboxgl.LngLatBounds();
      let markersAdded = false;

      projects.forEach((project) => {
        if (project.position?.lat && project.position?.lng) {
          // Añadir marcador del proyecto
          const marker = new mapboxgl.Marker()
            .setLngLat([project.position.lng, project.position.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3 style="color: #FF0000;">${project.title}</h3><pstyle="color: #FF0000;">${
                  project.city || "Sin ciudad"
                }</p>`
              )
            )
            .addTo(map.current);

          markers.current.push(marker);
          bounds.extend([project.position.lng, project.position.lat]);
          markersAdded = true;

          // Procesar incidentes del proyecto
          project.incidents?.forEach((incident) => {
            if (incident.coordinates?.lat && incident.coordinates?.lng) {
              const incidentMarker = new mapboxgl.Marker({ color: "#2b2b2b" })
                .setLngLat([incident.coordinates.lng, incident.coordinates.lat])
                .setPopup(
                  new mapboxgl.Popup({ offset: 25 }).setHTML(`
                     <h4 style="color: #FF0000;">Incidente</h4> 
                        <p style="color: #333333;">${incident.description}</p> 
                        <p style="color: #007BFF;">Estado: ${incident.status}</p>
                    `)
                )
                .addTo(map.current);

              markers.current.push(incidentMarker);
              bounds.extend([
                incident.coordinates.lng,
                incident.coordinates.lat,
              ]);
              markersAdded = true;
            }
          });
        }
      });

      // Si se añadieron marcadores, ajustar el mapa
      if (markersAdded) {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15,
        });
      }
    };

    // Actualizar marcadores cuando el mapa esté listo
    if (map.current.loaded()) {
      updateMarkers();
    } else {
      map.current.on("load", updateMarkers);
    }

    // Cleanup
    return () => {
      // Solo limpiar los marcadores, no destruir el mapa
      if (markers.current) {
        markers.current.forEach((marker) => marker.remove());
        markers.current = [];
      }
    };
  }, [projects]);

  // Cleanup final cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (map.current && initialized.current) {
        map.current.remove();
        map.current = null;
        initialized.current = false;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
      }}
    />
  );
}
