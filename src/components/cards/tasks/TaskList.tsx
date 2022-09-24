import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import {TaskRef} from "../../../models/card-model";
import {createRef, useReducer} from "react";
import {TaskActionTypes, taskReducer, TaskState} from "./store/taskReducer";

const INITIAL_STATE: TaskState = {taskList: []};

export default function TaskList({cardDetail}) {


    const [taskData, dispatch] = useReducer(
        taskReducer, INITIAL_STATE
    )


    const addNewTask = (taskName) => {
        dispatch({
            type: TaskActionTypes.ADD_SINGLE_TASK,
            payload: [{ref: createRef(), data: {id: Math.random(), name: taskName}}]
        })

    }
    const updateTasks = (item, newName) => {
        const existing = taskData.taskList.find(t => t === item);
        existing.data.name = newName;
        dispatch({
            type: TaskActionTypes.UPDATE_TASK,
            payload: [item]
        })
    }

    const deleteTask = (item) => {
        dispatch(
            {
                type: TaskActionTypes.DELETE_TASK,
                payload: [item]
            }
        )
    }


    return (
        <>
            <ul className='card-item-list'>
                {taskData && taskData.taskList.map((task: TaskRef, _) =>
                    <Task
                        key={'taskNo' + task.data.id}
                        taskItem={task}
                        updateTasks={updateTasks}
                        deleteTask={deleteTask}
                        innerRef={task.ref}
                    />
                )}
            </ul>
            {cardDetail.name && (
                <AddTaskForm key='addTaskForm' addNewTask={addNewTask}/>
            )}
        </>
    )
}
