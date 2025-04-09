import React, { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditedTask(task.task);
  };

  const handleUpdate = async () => {
    const res = await fetch('https://13y1o9ubkk.execute-api.ap-south-1.amazonaws.com/prod/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, task: editedTask })
    });

    if (res.ok) {
      onUpdate(editId, editedTask);
      setEditId(null);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch('https://13y1o9ubkk.execute-api.ap-south-1.amazonaws.com/prod/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    if (res.ok) onDelete(id);
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          {editId === task.id ? (
            <>
              <input
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{task.task}</span>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
