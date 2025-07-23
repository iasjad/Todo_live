import React from 'react';
import type { Task } from '../types/task';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  onUpdateStatus: (id: string, status: Task['status']) => void;
  onDeleteTask: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  onUpdateStatus,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one to get started!</p>;
  }

  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task._id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
