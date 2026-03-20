import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import ConfirmDialog from './components/ConfirmDialog';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.body.className = next === 'light' ? 'light' : '';
  };

  const openAdd = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <TaskProvider>
      <div className="app-shell">
        <div className="bg-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        <div className="app-content">
          <Header theme={theme} onToggleTheme={toggleTheme} onAddTask={openAdd} />
          <StatsBar />
          <FilterBar />
          <TaskList onEditTask={openEdit} onDeleteTask={setDeleteTarget} />
        </div>

        {modalOpen && (
          <TaskModal task={editingTask} onClose={closeModal} />
        )}

        {deleteTarget && (
          <ConfirmDialog
            task={deleteTarget}
            onClose={() => setDeleteTarget(null)}
          />
        )}
      </div>
    </TaskProvider>
  );
}
