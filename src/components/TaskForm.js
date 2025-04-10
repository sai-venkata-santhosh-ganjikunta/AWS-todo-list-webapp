import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask({ task, deadline });
    setTask('');
    setDeadline('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
