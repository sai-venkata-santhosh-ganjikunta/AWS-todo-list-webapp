import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch('https://13y1o9ubkk.execute-api.ap-south-1.amazonaws.com/prod/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = (task) => setTasks([...tasks, task]);

  const handleDelete = (id) =>
    setTasks(tasks.filter((task) => task.id !== id));

  const handleUpdate = (id, updatedText) =>
    setTasks(tasks.map((task) => (task.id === id ? { ...task, task: updatedText } : task)));

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
