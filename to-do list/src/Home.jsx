import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import './App.css'; // Import the CSS file for styling

function Home() {
    const [todos, setTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
            .then(result => {
                console.log('Data received:', result.data);
                setTodos(result.data);
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                fetchTodos(); // Fetch updated todos
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                fetchTodos(); // Fetch updated todos
            })
            .catch(err => console.log(err));
    };

    const handleSearch = () => {
        axios.get(`http://localhost:3001/search?query=${searchQuery}`)
            .then(result => {
                console.log('Search results:', result.data);
                setTodos(result.data);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h1>To Do List</h1>
            <Create fetchTodos={fetchTodos} />
            <div className='search_form'>
                <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input_field"
                />
                <button onClick={handleSearch} className="search_button">Search</button>
            </div>
            {
                todos.length === 0
                    ? 
                    <div className="no_record"><h2>No Record</h2></div>
                    : 
                    todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done ?
                                    <BsFillCheckCircleFill className='icon' />
                                    : <BsCircleFill className='icon' />
                                }
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
