import { useTaskContext } from '../context/TaskContext';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({ task, onClose }) {
  const { dispatch } = useTaskContext();

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Confirm delete">
      <div className={styles.dialog}>
        <div className={styles.icon}>
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="rgba(239,68,68,0.12)"/>
            <path d="M12 14h16M17 14v-2h6v2M15 14l1 14h8l1-14" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 19v5M17 19l.5 5M23 19l-.5 5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 className={styles.title}>Delete Task?</h3>
        <p className={styles.message}>
          Are you sure you want to delete <strong>"{task.title}"</strong>? This action cannot be undone.
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose} id="confirm-cancel-btn">
            Keep It
          </button>
          <button className={styles.deleteBtn} onClick={handleDelete} id="confirm-delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
