export default function TaskList({ tasks }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            padding: '12px 0',
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <span style={{ textAlign: 'left', fontSize: '1rem', color: '#333' }}>
            {task.title}
          </span>

          <span style={{ textAlign: 'right', fontSize: '0.9rem', color: '#666', marginLeft: '16px' }}>
            {formatDate(task.dueDate || task.createdAt)}
          </span>
        </li>
      ))}
    </ul>
  );
}