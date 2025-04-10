import React, { useState } from "react";
import "./TaskList.css";

function TaskList({ tasks, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.task);
  };

  const handleUpdate = () => {
    onUpdate(editingId, editText);
    setEditingId(null);
    setEditText("");
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          {editingId === task.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={handleUpdate}>💾 Save</button>
            </>
          ) : (
            <>
              <span>{task.task}</span>
              <div>
                <button onClick={() => handleEdit(task)}>✏️</button>
                <button onClick={() => onDelete(task.id)}>🗑️</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
