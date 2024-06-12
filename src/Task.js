import React, { useState } from 'react';
import refreshIcon from './refresh.png';
import './Task.css';

function Task({ task, handleStatusChange, handleEdit, handleDelete }) {
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const priorityColor = {
        high: '#FF1700', // Bright red
        medium: '#FF8E00', // Bright yellow
        low: '#06FF00' // Bright blue
    };

    const recurringSymbol = {
        daily: 'D',
        weekly: 'W',
        monthly: 'M'
    };
    const [isEdited, setIsEdited] = useState(false);
    const [editTitle, setTitle] = useState(task.title);
    const [editDiscription, setEditDiscription] = useState('');
    
    const toggleIsEdited = () => {
        setIsEdited(!isEdited);
    };
    
    const  handleInputChange = (e) => {
        const { name, value } = e.target;
        setTitle(e.target.value);
    }
    
    const handleEditClick = () => {
        setIsEdited(!isEdited);
        handleEdit(task.id, { ...task, title: editTitle, status: task.status });    
    };

    return (
    <div className="task">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="checkbox" onChange={() => handleStatusChange(task.id, task.status === 'complete' ? 'incomplete' : 'complete')} checked={task.status === 'complete'} />
        <div className="priority-icon" style={{ backgroundColor: priorityColor[task.priority] }}></div>
        <div>
            {isEdited ? (
                <input value={editTitle}  onChange={handleInputChange}  />
            ) : (
                <>
                    <h2>{editTitle}</h2>
                    <p className="description">{task.description}</p>
                </>
            )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={refreshIcon} alt='frequency icon' style={{ marginRight: '5px' }}/>
        <p className="recurring">{recurringSymbol[task.recurring] || task.recurring}</p>
      </div>
      {
        isEdited ? (
            <button onClick={handleEditClick}>Save</button> ) : (<button onClick={toggleIsEdited}>Edit</button> ) }
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </div >
  );
}

export default Task;