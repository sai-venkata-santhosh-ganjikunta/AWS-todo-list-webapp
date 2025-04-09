import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const res = await fetch('https://13y1o9ubkk.execute-api.ap-south-1.amazonaws.com/prod/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    });

    const data = await res.json();
    onAdd(data);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
