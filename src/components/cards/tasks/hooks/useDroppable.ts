import {TaskActionTypes, taskReducer, TaskState} from "../store/taskReducer";
import {useEffect, useReducer} from "react";

const INITIAL_STATE: TaskState = {taskList: []};
export const useDroppable = function (taskListRef) {

    const [taskData, dispatch] = useReducer(
        taskReducer, INITIAL_STATE
    )

    const isIntersecting = (rect1, rect2) => {
        return !(rect2.left > rect1.right ||
            rect2.right < rect1.left ||
            rect2.top > rect1.bottom ||
            rect2.bottom < rect1.top);
    }
    useEffect(() => {
        const taskList = taskListRef.current;

        // Drag and drop within the same list
        const handleCurrentTaskDrop = (e) => {
            const {draggedItem, taskRef} = e.detail;
            const cardRect = taskListRef.current.getBoundingClientRect();
            const taskRect = taskRef.current.getBoundingClientRect();
            if (!isIntersecting(cardRect, taskRect)) {
                // notify other list
                document.dispatchEvent(new CustomEvent('taskdrop', {
                    detail: {
                        draggedItem: draggedItem,
                        dispatchSource: taskListRef,
                        taskRef: taskRef
                    }
                }));
                document.dispatchEvent(new CustomEvent('taskresetpos'));
            } else {
                taskRef.current.dispatchEvent(new CustomEvent('taskreset'));
            }
        }

        const handleGlobalTaskDrop = (e) => {
            const {draggedItem, dispatchSource, taskRef} = e.detail;

            const dispatchOrigin = dispatchSource.current;
            const cardOrigin = taskListRef.current;

            const taskRect = taskRef.current.getBoundingClientRect();
            const cardRect = cardOrigin.getBoundingClientRect();

            const dispatchRemove = () => {
                dispatchSource.current.dispatchEvent(new CustomEvent('taskmoved', {
                    detail: {
                        draggedItem: draggedItem,
                        dispatchSource: dispatchSource
                    }
                }));
            }
            if (isIntersecting(cardRect, taskRect) && dispatchOrigin !== cardOrigin) {
                dispatch({
                    type: TaskActionTypes.MOVE_TASK,
                    payload: [draggedItem]
                })
            } else {
                dispatchRemove();
            }
        }

        const handleRemoveFromList = (e) => {
            const {draggedItem} = e.detail;
            dispatch({
                type: TaskActionTypes.DELETE_TASK,
                payload: [draggedItem]
            })
        }

        

        if (taskList) {
            taskList.addEventListener('taskdrop', handleCurrentTaskDrop);
            taskList.addEventListener('taskmoved', handleRemoveFromList);
            document.addEventListener('taskdrop', handleGlobalTaskDrop);
        }
        return () => {
            if (taskList) {
                taskList.removeEventListener('taskdrop', handleCurrentTaskDrop);
                taskList.removeEventListener('taskmoved', handleRemoveFromList);
            }
            document.removeEventListener('taskdrop', handleGlobalTaskDrop);
        }
    }, [taskListRef]);

    return {
        taskData,
        dispatch
    }
}
