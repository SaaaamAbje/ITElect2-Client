export default function TaskList({ tasks }) {
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
              fontSize: '0.85rem',
              padding: '4px 10px',
              borderRadius: '4px',
              fontWeight: 'bold',
              backgroundColor: task.completed ? '#d1fae5' : '#fef3c7',
              color: task.completed ? '#065f46' : '#92400e'
            }}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </li>
      ))}
    </ul>
  );
}