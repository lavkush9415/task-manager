import { useTaskContext } from '../context/TaskContext';
import styles from './FilterBar.module.css';

const FILTERS = [
  { id: 'filter-all', value: 'all', label: 'All' },
  { id: 'filter-pending', value: 'pending', label: 'Pending' },
  { id: 'filter-completed', value: 'completed', label: 'Completed' },
];

export default function FilterBar() {
  const { state, dispatch } = useTaskContext();

  return (
    <div className={styles.filterBar} role="tablist" aria-label="Task filters">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          id={f.id}
          role="tab"
          aria-selected={state.filter === f.value}
          className={`${styles.filterBtn} ${state.filter === f.value ? styles.active : ''}`}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: f.value })}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
