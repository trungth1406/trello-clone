import {useRef, useState} from "react";

export default function AddTaskForm({addNewTask}) {
    const [task, setTask] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>();


    const changeTaskName = (event) => {
        setTask(event.target.value);
    }

    const updateTaskList = (evt) => {
        if (evt.target.value !== '') {
            addNewTask(task);
            setTask('');
            inputRef.current.value = '';
        } else {
            evt.preventDefault();
            setError('Task name cannot be empty');
        }
    }

    const onKeyUp = (event) => {
        if (event.key === 'Enter') {
            updateTaskList(event);
        }
        setError('');
    }

    return (
        <section className='card-item-form'>
            <input ref={inputRef} type='text' placeholder='Add Task' onChange={changeTaskName} onKeyUp={onKeyUp}/>
            {error && <span className='error'>{error}</span>}
            <button className='add-card-item-button' onClick={updateTaskList}>
            </button>
        </section>
    )
}
