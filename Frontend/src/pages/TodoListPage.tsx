import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Task } from '../types/task';
import AddTaskForm from '../components/AddTaskForm';
import TodoList from '../components/TodoList';
import { getTasks, addTask, updateTask, deleteTask } from '../services/api';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const TodoListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setError('Could not load your tasks. Please try refreshing the page.');
      }
    };

    fetchTasks();
    const token = localStorage.getItem('token');
    if (token) {
      const newSocket = io(`${API_URL}`, {
        auth: {
          token: token,
        },
      });
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () =>
      console.log('Authenticated WebSocket connection established!')
    );
    socket.on('connect_error', (err: { message: any }) => {
      console.error('Connection Error:', err.message);
      setError('Real-time connection failed. Please log in again.');
      logout();
    });

    socket.on('task_created', (newTask: Task) =>
      setTasks((prev) => [newTask, ...prev])
    );
    socket.on('task_updated', (updatedTask: Task) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });
    socket.on('task_deleted', (deletedTaskId: string) => {
      setTasks((prev) => prev.filter((task) => task._id !== deletedTaskId));
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('task_created');
      socket.off('task_updated');
      socket.off('task_deleted');
    };
  }, [socket, logout]);

  const handleAddTask = async (text: string) => {
    try {
      await addTask(text);
    } catch (err) {
      console.error('Failed to add task:', err);
      setError('Failed to add task.');
    }
  };

  const handleUpdateStatus = async (id: string, status: Task['status']) => {
    try {
      await updateTask(id, { status });
    } catch (err) {
      console.error('Failed to update task:', err);
      setError('Failed to update task.');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task.');
    }
  };

  return (
    <>
      <header className="page-header">
        <h1>My To-Do List 📝</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </header>
      <main>
        <AddTaskForm onAddTask={handleAddTask} />
        {error && <p className="error-message">{error}</p>}
        <TodoList
          tasks={tasks}
          onUpdateStatus={handleUpdateStatus}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </>
  );
};

export default TodoListPage;
