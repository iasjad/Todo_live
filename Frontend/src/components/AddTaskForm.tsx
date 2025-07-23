import React, { useState } from 'react';

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return; 
    onAddTask(text);
    setText(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
