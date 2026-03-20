import { useTaskContext } from '../context/TaskContext';
import styles from './StatsBar.module.css';

export default function StatsBar() {
  const { stats } = useTaskContext();
  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className={styles.statsBar}>
      <div className={styles.stat}>
        <span className={styles.statValue}>{stats.total}</span>
        <span className={styles.statLabel}>Total</span>
      </div>
      <div className={styles.progressWrapper}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={styles.pct}>{pct}% done</span>
      </div>
      <div className={styles.stat}>
        <span className={`${styles.statValue} ${styles.completed}`}>{stats.completed}</span>
        <span className={styles.statLabel}>Done</span>
      </div>
      <div className={styles.statDivider} />
      <div className={styles.stat}>
        <span className={`${styles.statValue} ${styles.pending}`}>{stats.pending}</span>
        <span className={styles.statLabel}>Pending</span>
      </div>
    </div>
  );
}
