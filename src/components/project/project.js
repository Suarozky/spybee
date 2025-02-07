
"use client";
import { useEffect } from "react";
import { useCodeStore } from "@/store/useCodeStore";
import styles from "./projest.module.css";
import Card from "../card/card";

export default function Projects({ inicialData }) {
  const { showStats, showMap,isSmall } = useCodeStore();

  useEffect(() => {
    console.log("showStats cambió:", showStats);
    console.log("showMap cambió:", showMap);
  }, [showStats, showMap]);

  return (
    <div className={styles.page2}>
      <div className={styles.page}>
        {showMap && <div className={styles.map}>omg</div>}
        <div className={`${styles.row} ${isSmall ? styles.small : ""}`} >
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
          {inicialData.map((project) => (
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
              RFI={project.incidents.filter(incident => incident.item === "RFI").length}
            />
          ))}
        </div>
      </div>
      {showStats && <div className={styles.stats}>gg</div>}
    </div>
  );
}
