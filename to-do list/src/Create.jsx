import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function Create({ fetchTodos }) {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (task.trim() === '') return; // Prevent adding empty tasks
        axios.post('https://quiktasks-todo.onrender.com/add', { task: task })
            .then(result => {
                fetchTodos(); // Fetch updated todos
                setTask(''); // Clear the input field
            })
            .catch(error => console.log(error));
    };

    return (
        <div className='create_form'>
            <input
                type="text"
                placeholder='Enter Task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="input_field"
            />
            <button type="button" onClick={handleAdd} className="add_button">Add</button>
        </div>
    );
}

export default Create;
