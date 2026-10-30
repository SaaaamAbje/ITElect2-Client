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
          <div>
            <span
              style={{
                fontSize: '1rem',
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
            >
              {task.title}
            </span>
            
            {/* Display formatted due date */}
            {task.dueDate && (
              <small
                style={{
                  display: 'block',
                  color: '#666',
                  marginTop: '4px'
                }}
              >
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}
          </div>

          <span
            style={{
              fontSize: '0.85rem',
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: task.completed ? '#e2e8f0' : '#fef3c7',
              color: task.completed ? '#475569' : '#92400e'
            }}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </li>
      ))}
    </ul>
  );
}