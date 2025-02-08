import React from 'react';
import { ChevronRight, Clock, Filter } from 'lucide-react';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const metrics = [
    { label: 'Incidencias', total: 60, open: 10, color: 'rgb(239, 68, 68)' },
    { label: 'RFI', total: 50, open: 23, color: 'rgb(239, 68, 68)' },
    { label: 'Tareas', total: 120, open: 50, color: 'rgb(239, 68, 68)' }
  ];

  const projects = [
    {
      name: 'Proyecto uno',
      description: 'Revisar reportes del mié...',
      type: 'Incidencia',
      date: '12/08/2024',
      time: '15:00'
    },
    {
      name: 'Proyecto uno',
      description: 'Revisar reportes del mié...',
      type: 'Incidencia',
      date: '12/08/2024',
      time: '15:00'
    },
    {
      name: 'Proyecto uno',
      description: 'Revisar reportes del mié...',
      type: 'Incidencia',
      date: '12/08/2024',
      time: '15:00'
    }
  ];

  const CircularProgress = ({ value, total, color }) => {
    const percentage = (value / total) * 100;
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className={styles.circularProgress}>
        <svg className={styles.circularProgressSvg}>
          <circle className={styles.circularProgressBg} cx="48" cy="48" r="40" />
          <circle
            className={styles.circularProgressBar}
            cx="48"
            cy="48"
            r="40"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className={styles.circularProgressText}>{value}</div>
      </div>
    );
  };

  return (
    <div className={styles.dashboardSummary}>
      <div className={styles.dashboardHeader}>
        <h1>Resumen</h1>
        <ChevronRight className={styles.icon} />
      </div>

      <div className={styles.dashboardTabs}>
        <button className={styles.activeTab}>General</button>
        <button>Mis actualizaciones</button>
        <button className={styles.filterButton}>
          <Filter className={styles.icon} />
          Filtros
        </button>
      </div>

      <div className={styles.dashboardSection}>
        <div className={styles.dashboardSectionHeader}>
          <h2>Próximos a vencer</h2>
          <button className={styles.seeAllButton}>Ver todos</button>
        </div>

        <div className={styles.dashboardMetrics}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.dashboardMetric}>
              <div className={styles.metricLabel}>{metric.label}</div>
              <div className={styles.metricTotal}>{metric.total} Total Abiertas</div>
              <CircularProgress value={metric.open} total={metric.total} color={metric.color} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dashboardSection}>
        <div className={styles.dashboardProjectsHeader}>
          <div>Proyecto</div>
          <div>Item</div>
          <div>Fecha Límite</div>
        </div>
        {projects.map((project, index) => (
          <div key={index} className={styles.dashboardProject}>
            <div>
              <div className={styles.projectName}>{project.name}</div>
              <div className={styles.projectDescription}>{project.description}</div>
            </div>
            <div className={styles.projectType}>{project.type}</div>
            <div className={styles.projectDeadline}>
              <Clock className={styles.icon} />
              {project.date} <span>{project.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashboardSection}>
        <div className={styles.dashboardSectionHeader}>
          <h2>Próximos eventos</h2>
          <button className={styles.seeAllButton}>Ver todos</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
