import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Step 3 & 4: Fetch tasks from API on mount
  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks (Status: ${response.status})`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Error loading tasks from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Step 5: Handle Login POST /api/auth/login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      setUsername('');
      setPassword('');
    } catch (err) {
      setLoginError(err.message);
    }
  };

  // Step 6: Handle Create Task POST /api/tasks with Authorization Bearer header
  const handleAddTask = async (taskData) => {
    if (!token) {
      alert('You must be logged in to create a task!');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to add task');
      }

      // Re-fetch tasks after successful creation
      await fetchTasks();
    } catch (err) {
      alert(`Error creating task: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Task Manager</h1>

      {/* Login Section */}
      {!token ? (
        <form onSubmit={handleLogin} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h3>Login</h3>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div style={{ marginBottom: '20px', color: 'green' }}>
          <p><strong>Status:</strong> Logged In</p>
          <button onClick={() => setToken('')}>Logout</button>
        </div>
      )}

      {/* Task Creation Form */}
      {token && <TaskForm onAddTask={handleAddTask} />}

      <hr />

      {/* Task List / Loading / Error Handling */}
      {loading && <p>Loading tasks from server...</p>}

      {error && !loading && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          Error: {error}
        </p>
      )}

      {!loading && !error && tasks.length === 0 && (
        <p>No tasks available. Add one using the form above!</p>
      )}

      {!loading && !error && tasks.length > 0 && (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
}