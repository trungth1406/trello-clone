import {TaskActionTypes, taskReducer, TaskState} from "../store/taskReducer";
import {useEffect, useReducer} from "react";

const INITIAL_STATE: TaskState = {taskList: []};
export const useDroppable = function (taskListRef, cardDetail) {

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
        const handleTaskDrop = (e) => {
            const {draggedItem, taskRect} = e.detail;
            const cardRect = taskListRef.current.getBoundingClientRect();
            if (isIntersecting(taskRect, cardRect)) {
                console.log('intersecting with' , cardDetail);
                dispatch({
                    type: TaskActionTypes.MOVE_TASK,
                    payload: [draggedItem]

                })
            }
        }

        const handleRemoveFromList = (e) => {
            const {optionalOld} = e.detail;
            dispatch({
                type: TaskActionTypes.DELETE_TASK,
                payload: [optionalOld]
            })
        }

        if (taskListRef.current) {
            document.addEventListener('taskdrop', handleTaskDrop);
            document.addEventListener('removefromlist', handleRemoveFromList);
        }
    }, [taskListRef]);

    return {
        taskData,
        dispatch
    }
}
