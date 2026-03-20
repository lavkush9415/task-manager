import { createContext, useContext, useReducer, useEffect } from 'react';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  filter: 'all', // 'all' | 'pending' | 'completed'
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload };

    case 'ADD_TASK': {
      const newTask = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description || '',
        priority: action.payload.priority || 'medium',
        dueDate: action.payload.dueDate || '',
        completed: false,
        createdAt: new Date().toISOString(),
      };
      return { ...state, tasks: [newTask, ...state.tasks] };
    }

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };

    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('taskmanager_tasks');
      if (saved) {
        dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(saved) });
      }
    } catch (_) {}
  }, []);

  // Persist to localStorage on tasks change
  useEffect(() => {
    localStorage.setItem('taskmanager_tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  const filteredTasks = state.tasks.filter((t) => {
    if (state.filter === 'completed') return t.completed;
    if (state.filter === 'pending') return !t.completed;
    return true;
  });

  const stats = {
    total: state.tasks.length,
    completed: state.tasks.filter((t) => t.completed).length,
    pending: state.tasks.filter((t) => !t.completed).length,
  };

  return (
    <TaskContext.Provider value={{ state, dispatch, filteredTasks, stats }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext must be used within TaskProvider');
  return ctx;
}
