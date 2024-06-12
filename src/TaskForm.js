import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://127.0.0.1:5000/tasks';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [recurring, setRecurring] = useState('');
  const [reminder, setReminder] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const task = { title, description, dueDate, priority, status, recurring, reminder, to };
    axios.post(API_ENDPOINT, task).then(response => {
      addTask(response.data);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* form inputs */}
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <label htmlFor="reminder">Due Date:</label>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
      <select value={priority} onChange={e => setPriority(e.target.value)} required>
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>
        Recurring:
        <select value={recurring} onChange={e => setRecurring(e.target.value)}>
            <option value="">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
        </select>
      </label>
      <div>
        <label htmlFor="reminder">Reminder:</label>
        <input type="date" id="reminder" name="reminder" onChange={event => setReminder(event.target.value)} />
        <input type="text" value={to} onChange={e => setTo(e.target.value)} placeholder="Phone Number" required />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;