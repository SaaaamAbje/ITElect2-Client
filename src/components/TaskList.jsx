export default function TaskList({ tasks }) {
  // Helper function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            padding: '12px',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span
            style={{
              fontSize: '1rem',
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
          >
            {task.title}
          </span>

          <span
            style={{
              fontSize: '0.9rem',
              color: '#666'
            }}
          >
            {formatDate(task.dueDate || task.createdAt)}
          </span>
        </li>
      ))}
    </ul>
  );
}