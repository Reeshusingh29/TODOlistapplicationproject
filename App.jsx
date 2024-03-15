import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    
  ]);
  const [newTask, setNewTask] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [modeToggle, setModeToggle] = useState(false); // false = Light Mode, true = Dark Mode
  const [filter, setFilter] = useState('All');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = {
        id: tasks.length + 1,
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleModeToggle = () => {
    setDarkMode(!darkMode);
    setModeToggle(!modeToggle);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  let filteredTasks = tasks;
  if (filter !== 'All') {
    filteredTasks = tasks.filter((task) =>
      filter === 'Completed' ? task.completed : !task.completed
    );
  }

  return (
    <div className={`max-w-xl mx-auto py-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
      <h1 className={`text-3xl font-bold text-center mb-6 ${darkMode ? 'text-white' : ''}`}>
        To-Do List
      </h1>
      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={handleModeToggle}
          className={`px-4 py-2 rounded-md ${
            darkMode ? 'bg-blue-700 text-white' : 'bg-yellow-500 text-black'
          } hover:bg-blue-600`}
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={handleFilterChange}
            className={`px-4 py-2 rounded-md ${
              darkMode ? 'border-gray-600 text-white bg-gray-700' : 'border-gray-300'
            } focus:outline-none focus:border-blue-500`}
          >
            <option value="All">All Tasks</option>
            <option value="Completed">Completed Tasks</option>
            <option value="Pending">Pending Tasks</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between px-4 py-2 rounded-md ${
              task.completed ? 'bg-green-100' : darkMode ? 'bg-gray-700' : 'bg-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                className="form-checkbox h-5 w-5 text-green-500"
              />
              <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className={`${
                darkMode ? 'bg-red-600' : 'bg-red-500'
              } text-white px-2 py-1 rounded-md hover:bg-red-700`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex space-x-4">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-2 rounded-md border ${
            darkMode ? 'border-gray-600 text-white bg-gray-700' : 'border-gray-300'
          } focus:outline-none focus:border-blue-500`}
        />
        <button
          onClick={handleAddTask}
          className={`${
            darkMode ? 'bg-blue-700' : 'bg-blue-500'
          } text-white px-4 py-2 rounded-md hover:bg-blue-600`}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default App;
