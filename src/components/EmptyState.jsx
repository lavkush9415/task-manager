import styles from './EmptyState.module.css';

const MESSAGES = {
  all:       { emoji: '📋', title: 'No tasks yet!', sub: 'Click "Add Task" to get started.' },
  pending:   { emoji: '🎉', title: 'All done!',     sub: 'You have no pending tasks. Great work!' },
  completed: { emoji: '🚀', title: 'Nothing here yet', sub: 'Complete some tasks to see them here.' },
};

export default function EmptyState({ filter }) {
  const msg = MESSAGES[filter] || MESSAGES.all;

  return (
    <div className={styles.container}>
      <div className={styles.emoji}>{msg.emoji}</div>
      <h3 className={styles.title}>{msg.title}</h3>
      <p className={styles.sub}>{msg.sub}</p>
    </div>
  );
}
