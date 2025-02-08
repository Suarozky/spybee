"use client";
import { useEffect, useMemo, useCallback, useState } from "react";
import { useCodeStore } from "@/store/useCodeStore";
import styles from "./projest.module.css";
import Card from "../card/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../../hook/useDebounce";
import Map from "../map/map";
import Dashboard from "../dashboard/dashboard";

export default function Projects({ inicialData }) {
  const { showStats, showMap, isSmall, selectedProject } = useCodeStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Existing query string and search functions remain the same
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const debouncedSearch = useDebounce((term) => {
    router.push("?" + createQueryString("search", term));
  }, 300);

  const handleSort = (value) => {
    router.replace("?" + createQueryString("sort", value), { scroll: false });
  };

  const defaultSortValue = useMemo(
    () => searchParams.get("sort") || "incidents",
    [searchParams]
  );

  // Process data for the map
  const projectsWithCoordinates = useMemo(() => {
    return inicialData.map((project) => ({
      ...project,
      // Include project position
      position: project.position || null,
      // Process incidents with coordinates
      incidents: project.incidents.filter(
        (incident) => incident.coordinates?.lat && incident.coordinates?.lng
      ),
      // Include other necessary data for markers
      title: project.title,
      city: project.city,
      status: project.status,
      projectPlanData: project.projectPlanData,
    }));
  }, [inicialData]);

  // Existing filtering and sorting logic
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

  // Pagination logic
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const mapProjects = selectedProject
    ? inicialData.filter((project) => project.title === selectedProject)
    : inicialData;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.page2}>
      <div className={styles.page}>
        {showMap && <Map projects={mapProjects} />}

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
              RFI={
                project.incidents.filter((incident) => incident.item === "RFI")
                  .length
              }
            />
          ))}
        </div>

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
      {showStats && (
        <div className={styles.stats}>
          <Dashboard></Dashboard>
        </div>
      )}
    </div>
  );
}
