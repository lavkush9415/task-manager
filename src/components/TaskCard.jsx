import { useTaskContext } from '../context/TaskContext';
import styles from './TaskCard.module.css';

const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isOverdue(dateStr, completed) {
  if (!dateStr || completed) return false;
  return new Date(dateStr + 'T00:00:00') < new Date(new Date().toDateString());
}

export default function TaskCard({ task, index, onEdit, onDelete }) {
  const { dispatch } = useTaskContext();
  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <div
      className={`${styles.card} ${task.completed ? styles.done : ''}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Priority stripe */}
      <div className={`${styles.stripe} ${styles[`stripe_${task.priority}`]}`} />

      {/* Checkbox */}
      <button
        className={`${styles.checkBtn} ${task.completed ? styles.checked : ''}`}
        onClick={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id })}
        aria-label={task.completed ? 'Mark as pending' : 'Mark as completed'}
        id={`toggle-${task.id}`}
      >
        {task.completed && (
          <svg viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{task.title}</h3>
        {task.description && (
          <p className={styles.desc}>{task.description}</p>
        )}
        <div className={styles.meta}>
          <span className={`${styles.priority} ${styles[`p_${task.priority}`]}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          {task.dueDate && (
            <span className={`${styles.due} ${overdue ? styles.overdue : ''}`}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="12" height="11" rx="2"/>
                <path d="M5 1v3M11 1v3M2 7h12"/>
              </svg>
              {overdue ? 'Overdue · ' : ''}{formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          id={`edit-${task.id}`}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828L7 15.828 3 17l1.172-4L13.586 3.586z"/>
          </svg>
        </button>
        <button
          className={`${styles.iconBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete(task)}
          aria-label="Delete task"
          id={`delete-${task.id}`}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 6h14M8 6V4h4v2M6 6l1 10h6l1-10"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
