import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const INITIAL_TASKS = [
  { id: 1, title: 'Learn React', dueDate: '2026-10-25' },
  { id: 2, title: 'Build Task Manager UI', dueDate: '2026-10-28' },
  { id: 3, title: 'Connect to Render API', dueDate: '2026-11-01' }
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      dueDate: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}