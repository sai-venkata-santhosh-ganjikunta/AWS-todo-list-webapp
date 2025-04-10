import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch('https://13y1o9ubkk.execute-api.ap-south-1.amazonaws.com/prod/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (task) => {
    const response = await fetch('https://13y1o9ubkk.execute-api.ap-south-1.amazonaws.com/prod/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const updateTask = async (updatedTask) => {
    await fetch('https://13y1o9ubkk.execute-api.ap-south-1.amazonaws.com/prod/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch('https://13y1o9ubkk.execute-api.ap-south-1.amazonaws.com/prod/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <h1>📝 My To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
    </div>
  );
}

export default App;
