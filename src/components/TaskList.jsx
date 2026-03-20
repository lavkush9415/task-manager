import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { useTaskContext } from '../context/TaskContext';
import styles from './TaskList.module.css';

export default function TaskList({ onEditTask, onDeleteTask }) {
  const { filteredTasks, state } = useTaskContext();

  if (filteredTasks.length === 0) {
    return <EmptyState filter={state.filter} />;
  }

  return (
    <div className={styles.list}>
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          index={index}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}
