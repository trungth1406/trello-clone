import {useState} from "react";

export default function Task({taskItem, updateTasks, deleteTask}) {
    const [taskName, setTaskName] = useState(taskItem.name);
    const [isEditMode, setIsEditMode] = useState(false);

    const updateTaskName = (event) => {
        setTaskName(event.target.value);
    }

    const submitNewTaskName = (event) => {
        if (event.key === 'Enter') {
            updateTasks(taskItem, taskName);
            setIsEditMode(false);
        }
    }

    const changeGrabState = (evt, type: string) => {
        if (type === 'grab') {
            evt.target.style.cursor = 'grabbing';
        }
        if (type === 'release') {
            evt.target.style.cursor = 'grab';
        }

    }

    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.effectAllowed = 'move';
    }


    return (<li className='card-item'
                onMouseDownCapture={(evt) => changeGrabState(evt, 'grab')}
                onMouseUpCapture={(evt) => changeGrabState(evt, 'release')}
                onMouseLeave={(evt) => changeGrabState(evt, 'release')}
                onDragStart={handleDragStart}

    >
        {isEditMode ?
            <input id='edit_input' className='edit-input'
                   value={taskName}
                   onChange={updateTaskName}
                   onKeyDown={submitNewTaskName}/>
            :
            <h4 className='item-header'>{taskItem.name}</h4>
        }
        <section className="item-actions-container">
            <button id='edit_btn' className='item-actions' onClick={() => setIsEditMode((prev) => !prev)}>
            </button>
            <button id='delete_btn' className='item-actions' onClick={() => deleteTask(taskItem)}>
            </button>
        </section>
    </li>)
}
