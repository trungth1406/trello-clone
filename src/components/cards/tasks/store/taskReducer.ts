import {TaskRef} from "../../../../models/card-model";


export enum TaskActionTypes {
    ADD_SINGLE_TASK = 'ADD_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    DELETE_TASK = 'DELETE_TASK',
    MOVE_TASK = 'MOVE_TASK',
}

export interface TaskAction {
    type: TaskActionTypes;
    payload: TaskRef[];
}

export interface TaskState {
    taskList: TaskRef[];
}

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case TaskActionTypes.ADD_SINGLE_TASK:
            return {
                ...state,
                taskList: [...state.taskList, ...action.payload]
            }
        case TaskActionTypes.DELETE_TASK:
            return {
                ...state,
                taskList: state.taskList.filter(task => {
                    return task !== action.payload[0];
                })
            }
        case TaskActionTypes.MOVE_TASK:
            const optionalOld = state.taskList.filter(task => {
                return task === action.payload[0];
            })
            if (optionalOld.length > 0) {

                return state;
            } else {
                document.dispatchEvent(new CustomEvent('removefromlist', {
                    detail: {
                        optionalOld
                    }
                }));
                return {
                    taskList: [...action.payload, ...state.taskList]
                }
            }
        case TaskActionTypes.UPDATE_TASK:
        default:
            return state;

    }
};



