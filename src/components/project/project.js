"use client";
import { useEffect, useMemo, useCallback, useState } from "react";
import { useCodeStore } from "@/store/useCodeStore";
import styles from "./projest.module.css";
import Card from "../card/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../../hook/useDebounce";

export default function Projects({ inicialData }) {
  const { showStats, showMap, isSmall } = useCodeStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Función para crear query strings
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Búsqueda debounced
  const debouncedSearch = useDebounce((term) => {
    router.push("?" + createQueryString("search", term));
  }, 300);

  // Manejar el ordenamiento
  const handleSort = (value) => {
    router.replace("?" + createQueryString("sort", value), { scroll: false });
  };

  // Valor por defecto para el ordenamiento
  const defaultSortValue = useMemo(
    () => searchParams.get("sort") || "incidents",
    [searchParams]
  );

  // Filtrar y ordenar los datos
  const filteredAndSortedData = useMemo(() => {
    const searchTerm = searchParams.get("search") || "";
    const sortBy = searchParams.get("sort") || "incidents";

    let data = inicialData.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "incidents") {
      data.sort((a, b) => b.incidents.length - a.incidents.length);
    } else if (sortBy === "rfi") {
      data.sort(
        (a, b) =>
          b.incidents.filter((incident) => incident.item === "RFI").length -
          a.incidents.filter((incident) => incident.item === "RFI").length
      );
    }

    return data;
  }, [inicialData, searchParams]);

  // Calcular los datos paginados
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    console.log("showStats cambió:", showStats);
    console.log("showMap cambió:", showMap);
  }, [showStats, showMap]);

  return (
    <div className={styles.page2}>
      <div className={styles.page}>
        {showMap && <div className={styles.map}>omg</div>}
        <div className={`${styles.row} ${isSmall ? styles.small : ""}`}>
          <span className={styles.text}>Proyecto</span>
          <div className={styles.row2}>
            <span className={styles.text}>Plan</span>{" "}
            <span className={styles.text}>Estado</span>
          </div>
          <div className={styles.row3}>
            <span className={styles.text}>Equipo</span>
          </div>
          <span className={styles.text}>Items por vencer</span>
        </div>
        <div className={styles.projects}>
          {currentItems.map((project) => (
            <Card
              key={project._id}
              title={project.title}
              projectPlanData={{
                plan:
                  project.projectPlanData.plan === "big"
                    ? "Grande"
                    : project.projectPlanData.plan === "small"
                    ? "Pequeño"
                    : project.projectPlanData.plan,
              }}
              status={
                project.status === "pending_payment"
                  ? "pending"
                  : project.status
              }
              incidents={project.incidents}
              user={project.users}
              createdAt={project.createdAt}
              RFI={project.incidents.filter((incident) => incident.item === "RFI").length}
            />
          ))}
        </div>
        {/* Controles de paginación */}
        <div className={styles.pagination}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredAndSortedData.length}
          >
            Siguiente
          </button>
        </div>
      </div>
      {showStats && <div className={styles.stats}>gg</div>}
    </div>
  );
}