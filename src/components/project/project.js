import Image from "next/image";
import styles from "./projest.module.css";
import Card from "../card/card";

export default function Projects() {
  return (
    <div className={styles.page}>
      <div className={styles.row}>
        <span className={styles.text}>Proyecto</span>
        <div className={styles.row2}>
          <span className={styles.text}>Plan</span>{" "}
          <span className={styles.text}>Estado</span>
          <span className={styles.text}>Equipo</span>
        </div>

        <span className={styles.text}>Items por vencer</span>
      </div>
      <div className={styles.projects}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
