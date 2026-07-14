import React, { useState } from 'react';
import './style/TaskInput.css';

interface InputTaskProps {
    onAddTask: (newTask: string) => void;
}

function TaskInput({ onAddTask }: InputTaskProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onAddTask(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className='input'
                aria-label='Escribe una nueva tarea...'
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe una nueva tarea..."
            />
            <button className='btn' type="submit">Añadir2 Tarea</button>
        </form>
    );
}

export default TaskInput;