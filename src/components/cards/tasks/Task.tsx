import {useEffect, useState} from "react";
import {useDraggable} from "./hooks/useDraggable";


export default function Task({taskItem, updateTasks, deleteTask, innerRef}) {
    const [taskName, setTaskName] = useState(taskItem.data.name);
    const [isEditMode, setIsEditMode] = useState(false)
    const {currentPos, dragging} = useDraggable(innerRef);


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

    useEffect(() => {
        console.log('currentPos', currentPos);
    }, [currentPos])


    return (<li
        ref={innerRef}
        className='card-item'
        onMouseDownCapture={(evt) => changeGrabState(evt, 'grab')}
        onMouseUpCapture={(evt) => changeGrabState(evt, 'release')}
        onMouseLeave={(evt) => changeGrabState(evt, 'release')}
        style={
            {
                position: 'relative',
                left: currentPos.x,
                top: currentPos.y
            }
        }
    >
        {isEditMode ?
            <input id='edit_input' className='edit-input'
                   value={taskName}
                   onChange={updateTaskName}
                   onKeyDown={submitNewTaskName}/>
            :
            <h4 className='item-header'>{taskItem.data.name}</h4>
        }
        <section className="item-actions-container">
            <button id='edit_btn' className='item-actions' onClick={() => setIsEditMode((prev) => !prev)}>
            </button>
            <button id='delete_btn' className='item-actions' onClick={() => deleteTask(taskItem)}>
            </button>
        </section>
    </li>)
}
