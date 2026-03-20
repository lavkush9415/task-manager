# ✅ Task Manager

A modern, responsive **Task Manager** web application built with **React 19** and **Vite**. Features a sleek dark/light theme, smooth animations, and full task lifecycle management — all persisted in the browser's `localStorage` with no backend required.

---

## 📸 Features

- ✅ **Add / Edit / Delete** tasks via a polished modal dialog
- ✔️ **Toggle completion** status on any task
- 🎯 **Priority levels** — Low, Medium, High
- 📅 **Due dates** for deadline tracking
- 🔍 **Filter tasks** by All / Pending / Completed
- 📊 **Stats bar** displaying total, completed, and pending counts
- 🌗 **Dark / Light theme** toggle
- 💾 **Persistent storage** — tasks survive page refreshes via `localStorage`
- 🗑️ **Confirm dialog** before deleting a task
- 📱 **Fully responsive** layout

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI library |
| [Vite](https://vitejs.dev/) | 8 | Build tool & dev server |
| React Context + `useReducer` | — | Global state management |
| CSS Modules | — | Component-scoped styling |
| `localStorage` | — | Client-side data persistence |

---

## 📁 Project Structure

```
task-manager/
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── Header.jsx        # App header with theme toggle & add button
│   │   ├── StatsBar.jsx      # Task statistics summary
│   │   ├── FilterBar.jsx     # All / Pending / Completed filter tabs
│   │   ├── TaskList.jsx      # Renders the list of task cards
│   │   ├── TaskCard.jsx      # Individual task card with actions
│   │   ├── TaskModal.jsx     # Add / Edit task modal form
│   │   ├── ConfirmDialog.jsx # Delete confirmation dialog
│   │   └── EmptyState.jsx    # Shown when the task list is empty
│   ├── context/
│   │   └── TaskContext.jsx   # Global state (Context + useReducer)
│   ├── App.jsx               # Root component & layout orchestration
│   ├── App.css               # Global app layout & background styles
│   ├── index.css             # CSS variables, resets, and design tokens
│   └── main.jsx              # React entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**

   ```
   http://localhost:5173
   ```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Build the optimised production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## 🧩 State Management

All task state is managed globally via **React Context** (`TaskContext.jsx`) using the `useReducer` hook. The following actions are supported:

| Action | Description |
|---|---|
| `ADD_TASK` | Adds a new task with a UUID, timestamps, and defaults |
| `EDIT_TASK` | Updates an existing task by ID |
| `DELETE_TASK` | Removes a task from the list |
| `TOGGLE_COMPLETE` | Flips the `completed` boolean on a task |
| `SET_FILTER` | Sets the active filter (`all` / `pending` / `completed`) |
| `LOAD_TASKS` | Hydrates state from `localStorage` on app mount |

Tasks are automatically saved to `localStorage` under the key `taskmanager_tasks` whenever the task list changes.

---

## 🎨 Theming

The app supports **Dark** (default) and **Light** themes, toggled via the button in the header. Theme is applied by setting a `light` class on `document.body`, which overrides the CSS custom properties defined in `index.css`.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
