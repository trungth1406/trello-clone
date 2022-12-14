import {useEffect, useRef, useState} from "react";
import {useDraggable} from "../hooks/useDraggable";

export default function Task({taskItem, updateTasks, deleteTask, innerRef, parentRef}) {
    const [taskName, setTaskName] = useState(taskItem.data.name);
    const [isEditMode, setIsEditMode] = useState(false)
    const {currentPos, pressed} = useDraggable(innerRef, parentRef, taskItem);
    const inputRef = useRef<HTMLInputElement>();


    useEffect(() => {
        if (isEditMode) {
            inputRef.current.focus();
        }
    }, [inputRef , isEditMode])

    const updateTaskName = (event) => {
        setTaskName(event.target.value);
    }

    const submitNewTaskName = (event) => {
        if (event.key === 'Enter') {
            updateTasks(taskItem, taskName);
            setIsEditMode(false);
        }
    }


  

    return (
    <section className='item-container'>
        <li
            ref={innerRef}
            className='card-item'
            style={
                {
                    position: 'relative',
                    left: currentPos.x,
                    top: currentPos.y,
                    cursor: pressed ? 'grabbing' : 'grab'
                }
            }
        >
            {!isEditMode ?
                <h4 className='item-header'>{taskItem.data.name}</h4> :
                <input 
                data-testid='edit_task_input'
                id='edit_input' 
                className='edit-input'
                       ref={inputRef}
                       value={taskName}
                       onChange={updateTaskName}
                       onKeyDown={submitNewTaskName}/>
            }
            <section className="item-actions-container">
                <button data-testid='edit-task_btn'  id='edit_btn' className='item-actions' onClick={() => setIsEditMode((prev) => !prev)}>
                </button>
                <button  data-testid='delete-task_btn' id='delete_btn' className='item-actions' onClick={() => deleteTask(taskItem)}>
                </button>
            </section>
        </li>
    </section>)
}
