"use client";
import styles from "./filter.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosOptions } from "react-icons/io";
import { CiGrid42 } from "react-icons/ci";
import { LiaMapMarkerSolid } from "react-icons/lia";
import { useCodeStore } from "@/store/useCodeStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../../hook/useDebounce";
import { useCallback, useMemo } from "react";

export default function FilterInput() {
  const { toggleStats, toggleMapAndStats } = useCodeStore();
  const router = useRouter();
  const searchParams = typeof window !== "undefined" ? useSearchParams() : null;


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
          defaultValue={defaultSortValue}
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
export const dynamic = "force-dynamic";
