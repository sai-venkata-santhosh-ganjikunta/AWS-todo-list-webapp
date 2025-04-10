import React, { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [editedDeadline, setEditedDeadline] = useState('');

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditedTask(task.task);
    setEditedDeadline(task.deadline);
  };

  const saveEdit = (id) => {
    onUpdate({ id, task: editedTask, deadline: editedDeadline });
    setEditingId(null);
  };

  const getTimeLeft = (deadline) => {
    if (!deadline) return 'No deadline';
    const diff = new Date(deadline) - new Date();
    if (diff < 0) return 'Expired';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m left`;
  };

  return (
    <div className="task-list">
      {tasks.map((taskObj) => (
        <div key={taskObj.id} className="task-card">
          {editingId === taskObj.id ? (
            <>
              <input value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
              <input
                type="datetime-local"
                value={editedDeadline}
                onChange={(e) => setEditedDeadline(e.target.value)}
              />
              <button onClick={() => saveEdit(taskObj.id)}>💾</button>
            </>
          ) : (
            <>
              <div className="task-text">{taskObj.task}</div>
              <div className="task-deadline">{getTimeLeft(taskObj.deadline)}</div>
              <div className="task-buttons">
                <button onClick={() => handleEdit(taskObj)}>✏️</button>
                <button onClick={() => onDelete(taskObj.id)}>🗑️</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
