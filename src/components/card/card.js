import styles from "./card.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Card() {
  return (
    <div className={styles.page}>
      <div className={styles.order}>
        <div>
          <img
            className={styles.image}
            src="/web/beelogo.jpg"
            alt="search"
            width={40}
            height={40}
          />{" "}
        </div>
        <div>
          <span className={styles.text}>Nombre del proyecto</span>
          <div>
            <span className={styles.text}>24 Nov 2023</span>
            <span className={styles.text}>24 Nov 2023</span>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <button className={`${styles.button} ${styles.text}`}>Pequeña</button>
        <button className={`${styles.button} ${styles.text}`}>Activo</button>
        <button className={`${styles.button} ${styles.text}`}>3</button>
      </div>

      <div className={styles.row2}>
        <div>
          <div className={styles.text}>45</div>
          <div className={styles.text}>incidencias</div>
        </div>
        <div>
          <div className={styles.text}>45</div>
          <div className={styles.text}>RFI</div>
        </div>
        <div>
          <div className={styles.text}>45</div>
          <div className={styles.text}>areas</div>
        </div>
      </div>
    </div>
  );
}
