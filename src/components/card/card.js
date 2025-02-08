import styles from "./card.module.css";
import { useCodeStore } from "@/store/useCodeStore";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";

export default function Card({
  title,
  projectPlanData,
  status,
  incidents,
  user,
  createdAt,
  RFI
}) {
  const { isSmall, toggleStats, toggleMapAndStats, setSelectedProject } = useCodeStore();

  const handleMapClick = () => {
    setSelectedProject(title);
  };

  return (
    <div 
      className={`${styles.page} ${isSmall ? styles.small : ""}`}
      onClick={handleMapClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={`${styles.order} ${isSmall ? styles.small : ""}`}>
        <img
          className={styles.image}
          src="/web/beelogo.jpg"
          alt="logo"
          width={40}
          height={40}
        />
        <div>
          <span className={`${styles.text} ${isSmall ? styles.small : ""}`}>
            {title}
          </span>
          <div>
            <span className={`${styles.text} ${isSmall ? styles.small : ""}`}>
              {createdAt}
            </span>
          </div>
        </div>
      </div>

      <div 
        className={`${styles.row} ${isSmall ? styles.small : ""}`}
        onClick={e => e.stopPropagation()} // Evitar que los clicks en los botones propaguen
      >
        <button
          className={`${styles.button2} ${
            styles[projectPlanData.plan] || styles.default
          } ${isSmall ? styles.small : ""}`}
          onClick={toggleStats}
        >
          {projectPlanData.plan}
        </button>
        <button
          className={`${styles.button} ${styles[status] || styles.default} ${
            isSmall ? styles.small : ""
          }`}
          onClick={handleMapClick}
        >
          {status}
        </button>
      </div>

      <AvatarGroup className={isSmall ? styles.small : ""}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar>+{user.length}</Avatar>
      </AvatarGroup>

      <div className={`${styles.row2} ${isSmall ? styles.small : ""}`}>
        <div>
          <div className={`${styles.text} ${isSmall ? styles.small : ""}`}>
            {incidents.length}
          </div>
          <div className={`${styles.text} ${isSmall ? styles.small : ""}`}>
            Incidencias
          </div>
        </div>
        <div>
          <div className={`${styles.text} ${isSmall ? styles.small : ""}`}>
            {RFI}
          </div>
          <div className={`${styles.text} ${isSmall ? styles.small : ""}`}>
            RFI
          </div>
        </div>
        <div>
          <div className={`${styles.text} ${isSmall ? styles.small : ""}`}>
            45
          </div>
          <div className={`${styles.text} ${isSmall ? styles.small : ""}`}>
            Áreas
          </div>
        </div>
      </div>
    </div>
  );
}