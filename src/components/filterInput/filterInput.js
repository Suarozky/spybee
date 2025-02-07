"use client";
import styles from "./filter.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosOptions } from "react-icons/io";
import { CiGrid42 } from "react-icons/ci";
import { LiaMapMarkerSolid } from "react-icons/lia";
import { useCodeStore } from "@/store/useCodeStore";
import { useRouter } from "next/navigation";
import { useDebounce } from "../../hook/useDebounce";
import { useCallback, useEffect, useState } from "react";

export default function FilterInput() {
  const { toggleStats, toggleMapAndStats } = useCodeStore();
  const router = useRouter();

  // Estado para manejar los parámetros de búsqueda
  const [params, setParams] = useState(new URLSearchParams());

  useEffect(() => {
    // Obtenemos searchParams desde window.location.search
    const urlParams = new URLSearchParams(window.location.search);
    setParams(urlParams);
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para crear query strings
  const createQueryString = useCallback(
    (name, value) => {
      const newParams = new URLSearchParams(params);
      newParams.set(name, value);
      return newParams.toString();
    },
    [params]
  );

  // Búsqueda debounced
  const debouncedSearch = useDebounce((term) => {
    router.push("?" + createQueryString("search", term));
  }, 300);

  // Manejar el ordenamiento
  const handleSort = (value) => {
    router.replace("?" + createQueryString("sort", value), { scroll: false });
  };

  // Estado para manejar el valor por defecto del select
  const [defaultSortValue, setDefaultSortValue] = useState("incidents");

  useEffect(() => {
    setDefaultSortValue(params.get("sort") || "incidents");
  }, [params]);

  return (
    <div className={styles.page}>
      <div className={styles.zone1}>
        <span className={styles.text2}>Mis Proyectos</span>
        <span className={styles.text}>13 Proyectos</span>
      </div>
      <div className={styles.zone1}>
        <div className={styles.bgButton}>
          <button className={styles.button}>
            <IoIosOptions className={styles.icon2} />
          </button>
          <button className={styles.button} onClick={() => toggleStats()}>
            <CiGrid42 className={styles.icon2} />
          </button>
          <button className={styles.button} onClick={() => toggleMapAndStats()}>
            <LiaMapMarkerSolid className={styles.icon2} />
          </button>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={`${styles.input} ${styles.text}`}
            type="text"
            placeholder="Buscar"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          <RiArrowDropDownLine className={styles.icon} />
        </div>
        <select
          onChange={(e) => handleSort(e.target.value)}
          value={defaultSortValue}
          className={styles.select}
        >
          <option value="incidents">Ordenar por Incidentes</option>
          <option value="rfi">Ordenar por RFI</option>
        </select>
        <button className={styles.button2}>
          <RiArrowDropDownLine className={styles.icon} />
          <span className={styles.text}>Crear proyecto</span>
        </button>
      </div>
    </div>
  );
}
