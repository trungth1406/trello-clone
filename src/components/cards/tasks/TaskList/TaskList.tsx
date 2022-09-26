import Task from '../Task/Task';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { TaskRef } from '../../../../models/card-model';
import { createRef, useEffect, useRef } from 'react';
import { TaskActionTypes } from '../store/taskReducer';
import { useDroppable } from '../hooks/useDroppable';

export default function TaskList({ cardDetail }) {
    const listRef = useRef<HTMLUListElement>(null);

    const { taskData, dispatch } = useDroppable(listRef);

    const newData = (taskName: string, id?: any) => {
        return {
            ref: createRef(),
            data: { id: id || Math.random(), name: taskName },
        };
    };

    useEffect(() => {
        dispatch({
            type: TaskActionTypes.ADD_ALL,
            payload: cardDetail.items.map((item) =>
                newData(item.name, item.id)
            ),
        });
    }, [cardDetail.items, dispatch]);

    const addNewTask = (taskName) => {
        dispatch({
            type: TaskActionTypes.ADD_SINGLE_TASK,
            payload: [newData(taskName)],
        });
    };
    const updateTasks = (item, newName) => {
        const existing = taskData.taskList.find((t) => t === item);
        existing.data.name = newName;
        dispatch({
            type: TaskActionTypes.UPDATE_TASK,
            payload: [item],
        });
    };

    const deleteTask = (item) => {
        dispatch({
            type: TaskActionTypes.DELETE_TASK,
            payload: [item],
        });
    };

    return (
        <>
            <ul
                data-testid="task_list"
                className="card-item-list"
                ref={listRef}
            >
                {taskData &&
                    taskData.taskList.map((task: TaskRef, _) => (
                        <Task
                            key={'taskNo' + task.data.id}
                            taskItem={task}
                            updateTasks={updateTasks}
                            deleteTask={deleteTask}
                            innerRef={task.ref}
                            parentRef={listRef}
                        />
                    ))}
            </ul>
            {cardDetail.name && (
                <AddTaskForm
                    key="addTaskForm"
                    addNewTask={addNewTask}
                />
            )}
        </>
    );
}
