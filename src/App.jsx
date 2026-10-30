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
  
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: emailOrUser, 
          username: emailOrUser, 
          password 
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Invalid credentials');
      }

      setToken(data.token);
      setEmailOrUser('');
      setPassword('');
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleAddTask = async (taskData) => {
    if (!token) {
      alert('You must be logged in to create a task!');
      return;
    }

    const payload = typeof taskData === 'string' ? { title: taskData } : taskData;

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || errData.error || 'Failed to add task');
      }

      await fetchTasks();
    } catch (err) {
      alert(`Error creating task: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Task Manager</h1>

      {!token ? (
        <form onSubmit={handleLogin} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h3>Login</h3>
          {loginError && <p style={{ color: 'red', fontWeight: 'bold' }}>{loginError}</p>}
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Username or Email"
              value={emailOrUser}
              onChange={(e) => setEmailOrUser(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Login</button>
        </form>
      ) : (
        <div style={{ marginBottom: '20px', color: 'green', border: '1px solid green', padding: '10px', borderRadius: '5px' }}>
          <p style={{ margin: 0 }}><strong>Status:</strong> Logged In Successfully</p>
          <button onClick={() => setToken('')} style={{ marginTop: '10px', cursor: 'pointer' }}>Logout</button>
        </div>
      )}

      {token && <TaskForm onAddTask={handleAddTask} />}

      <hr />

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