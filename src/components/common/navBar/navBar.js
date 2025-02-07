import styles from "./navBar.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function NavBar() {
  return (
    <div className={styles.page}>
      <div>
        <img src="/web/logo2.jpg" alt="search" width={110} height={50} />
      </div>
      <div className={styles.nav}>
        <div>
          <img src="/web/profile.jpg" alt="search" width={55} height={55} />
        </div>
        <div className={styles.menu}>
          <span>Brayan</span>
          <span>Administrador</span>
        </div>
        <button className={styles.button}><RiArrowDropDownLine /></button>
      </div>
    </div>
  );
}
