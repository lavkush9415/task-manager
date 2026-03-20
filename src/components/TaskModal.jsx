import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import styles from './TaskModal.module.css';

const EMPTY_FORM = { title: '', description: '', priority: 'medium', dueDate: '' };

export default function TaskModal({ task, onClose }) {
  const { dispatch } = useTaskContext();
  const isEdit = Boolean(task);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
      });
    }
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [task]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (isEdit) {
      dispatch({ type: 'EDIT_TASK', payload: { ...task, ...form } });
    } else {
      dispatch({ type: 'ADD_TASK', payload: form });
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label={isEdit ? 'Edit Task' : 'Add Task'}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isEdit ? '✏️ Edit Task' : '✨ New Task'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal" id="modal-close-btn">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5l-10 10"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} id="task-form">
          {/* Title */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="task-title">Title <span className={styles.required}>*</span></label>
            <input
              id="task-title"
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              type="text"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={(e) => { setForm(f => ({ ...f, title: e.target.value })); setErrors({}); }}
              autoFocus
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          {/* Description */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              className={styles.textarea}
              placeholder="Add more details (optional)..."
              rows={3}
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>

          {/* Priority & Due Date */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                className={styles.select}
                value={form.priority}
                onChange={(e) => setForm(f => ({ ...f, priority: e.target.value }))}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="task-due">Due Date</label>
              <input
                id="task-due"
                className={styles.input}
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm(f => ({ ...f, dueDate: e.target.value }))}
              />
            </div>
          </div>

          {/* Actions */}
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose} id="modal-cancel-btn">
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} id="modal-submit-btn">
              {isEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
