import { TaskRef } from '../../../../models/card-model';
import { createRef } from 'react';

export enum TaskActionTypes {
    ADD_SINGLE_TASK = 'ADD_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    DELETE_TASK = 'DELETE_TASK',
    MOVE_TASK = 'MOVE_TASK',
    ADD_ALL = 'ADD_ALL',
}

export interface TaskAction {
    type: TaskActionTypes;
    payload: TaskRef[];
}

export interface TaskState {
    taskList: TaskRef[];
}

export const taskReducer = (
    state: TaskState,
    action: TaskAction
): TaskState => {
    switch (action.type) {
        case TaskActionTypes.ADD_ALL:
            return {
                ...state,
                taskList: action.payload,
            };
        case TaskActionTypes.ADD_SINGLE_TASK:
            return {
                ...state,
                taskList: [...state.taskList, ...action.payload],
            };
        case TaskActionTypes.DELETE_TASK:
            const matched = state.taskList.filter((task) => {
                return task === action.payload[0];
            });
            if (matched.length > 0) {
                return {
                    ...state,
                    taskList: state.taskList.filter((task) => {
                        return task !== action.payload[0];
                    }),
                };
            }
            return state;
        case TaskActionTypes.MOVE_TASK:
            const optionalOld = state.taskList.filter((task) => {
                return task === action.payload[0];
            });
            if (optionalOld.length > 0) {
                return state;
            } else {
                const newItem = action.payload[0];
                return {
                    taskList: [
                        {
                            ref: createRef(),
                            data: {
                                id: Math.random(),
                                name: newItem.data.name,
                            },
                        },
                        ...state.taskList,
                    ],
                };
            }
        case TaskActionTypes.UPDATE_TASK:
        default:
            return state;
    }
};
