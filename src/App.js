import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskForm from './TaskForm';
import './App.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://127.0.0.1:5000';

function App() {
  const [tasks, setTasks] = useState([]);

  const filterTasks = (tasks) => {
    const definedTasks = tasks.filter(task => task !== undefined);
    const completedTasks = tasks.filter(task => task.status === 'complete');
    const incompleteTasks = tasks.filter(task => task.status === 'incomplete');

    return { definedTasks, completedTasks, incompleteTasks };
  };

  const addTask = task => {
    if (!task.reminder) {
      console.error('No reminder provided');
      return;
    }
  
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
  
    axios.post(API_ENDPOINT + '/send-reminder', { reminder: task.reminder, title: task.title, to: task.to })
      .then(response => {
        console.log('Reminder sent: ', response.data);
      })
      .catch(error => {
        console.error('Error sending reminder: ', error);
      });
  };

  useEffect(() => {
    axios.get(API_ENDPOINT + '/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, []);

  const handleStatusChange = (id, status) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleEdit = (id, newTask) => {
    axios.put(API_ENDPOINT + '/tasks/' + id, newTask)
      .then(response => {
        const updatedTasks = tasks.map(task => task.id === id ? response.data : task);
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error('Error updating task: ', error);
      });
  };
  
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const { definedTasks, completedTasks, incompleteTasks } = filterTasks(tasks);

  return (
    <div className="app">
      <TaskForm addTask={addTask} />
      <h2>Incomplete Tasks</h2>
      {incompleteTasks.map(task => (
        <Task key={task.id} task={task} handleStatusChange={handleStatusChange} handleEdit={handleEdit} handleDelete={handleDelete} />
      ))}
      <h2>Completed Tasks</h2>
      {completedTasks.map(task => (
        <Task key={task.id} task={task} handleStatusChange={handleStatusChange} handleEdit={handleEdit} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default App;