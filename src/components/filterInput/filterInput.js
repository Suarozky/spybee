import styles from "./filter.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosOptions } from "react-icons/io";
import { CiGrid42 } from "react-icons/ci";
import { LiaMapMarkerSolid } from "react-icons/lia";

export default function FilterInput() {
  return (
    <div className={styles.page}>
      <div className={styles.zone1}>
        <span className={styles.text2 }>Mis Proyectos</span>
        <span className={styles.text}>13 Proyectos</span>
      </div>
      <div className={styles.zone1}>
        <div className={styles.bgButton}>
          <button className={styles.button}><IoIosOptions className={styles.icon2} /></button>
          <button className={styles.button}><CiGrid42 className={styles.icon2}  /></button>
          <button className={styles.button}><LiaMapMarkerSolid className={styles.icon2}  /></button>
        </div>
        <div className={styles.inputContainer}>
          <input className={`${styles.input} ${styles.text}`} type="text" placeholder="Buscar" />
          <RiArrowDropDownLine className={styles.icon} />
        </div>
        <button className={styles.button2}>
          <RiArrowDropDownLine className={styles.icon} />
          <span className={styles.text}>Crear proyecto</span>
        </button>
      </div>
    </div>
  );
}
