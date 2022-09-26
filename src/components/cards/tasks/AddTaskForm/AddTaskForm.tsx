import { useRef, useState } from 'react';

export default function AddTaskForm({ addNewTask }) {
    const [task, setTask] = useState('');
    const [error, setError] = useState(false);
    const inputRef = useRef<HTMLInputElement>();

    const changeTaskName = (event) => {
        setTask(event.target.value);
    };

    const updateTaskList = () => {
        addNewTask(task);
        setTask('');
    };

    const onKeyUp = (event) => {
        if (inputRef.current.value !== '') {
            if (event.key === 'Enter') {
                setTask('');
                inputRef.current.value = '';
                updateTaskList();
            }
            setError(false);
        } else {
            setError(true);
        }
    };

    return (
        <section className="card-item-form">
            <input
                data-testid="task_input"
                ref={inputRef}
                type="text"
                placeholder="Add Task"
                onChange={changeTaskName}
                onKeyUp={onKeyUp}
            />
            {error && (
                <span
                    data-testid="input_error"
                    className="error"
                >
                    Task name cannot be empty
                </span>
            )}
            <button
                data-testid="add-task_btn"
                className="add-card-item-button"
                onClick={updateTaskList}
            ></button>
        </section>
    );
}
