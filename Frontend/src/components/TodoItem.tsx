import React from 'react';
import type { Task } from '../types/task';

interface TodoItemProps {
  task: Task;
  onUpdateStatus: (id: string, status: Task['status']) => void;
  onDeleteTask: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onUpdateStatus,
  onDeleteTask,
}) => {
  return (
    <div className={`todo-item ${task.status.replace(' ', '-')}`}>
      <div className="task-content">
        <p>{task.text}</p>
        <small className="task-creator">
          {task.user?.email || 'Unknown user'}
        </small>
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) =>
            onUpdateStatus(task._id, e.target.value as Task['status'])
          }
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => onDeleteTask(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
