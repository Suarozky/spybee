import styles from "./card.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";

export default function Card({
  title,
  projectPlanData,
  status,
  incidents,
  user,
  createdAt
}) {
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
          <span className={styles.text}>{title}</span>
          <div>
            <span className={styles.text}>{createdAt}</span>
     
          </div>
        </div>
        <div className={styles.row}>
          <button className={`${styles.button2} ${styles.text}`}>
            {projectPlanData.plan}
          </button>
          <button className={`${styles.button} ${styles[status] || styles.default}`}>
            {status}
          </button>
        </div>
      </div>
      <AvatarGroup>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar>+{user.length}</Avatar>
      </AvatarGroup>

      <div className={styles.row2}>
        <div>
          <div className={styles.text}>{incidents.length}</div>
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
