// src/index.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style/imdex.css';
import TaskList from './components/tasks/TaskList';
import AddTaskForm from './components/AddTaskForm';
import {Task} from "./model/Task.model";
// interface Task {
//     task: GT
// }

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://64c215b3fa35860baea12848.mockapi.io/Tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async (title: string) => {
        try {
            const response = await axios.post('https://64c215b3fa35860baea12848.mockapi.io/Tasks', {
                title,
                completed: false,
            });
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await axios.delete(`https://64c215b3fa35860baea12848.mockapi.io/Tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEditTask = async (id: string, updatedTask: Task) => {
        try {
            const response = await axios.put(`https://64c215b3fa35860baea12848.mockapi.io/Tasks/${id}`, updatedTask);
            setTasks(tasks.map(task => task.id === id ? response.data : task));
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    return (
        <div className="app">
            <h1>Task Manager</h1>
            <AddTaskForm onAdd={handleAddTask} />
            <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
