import { TaskRef } from '../../../../models/card-model';
import { TaskAction, TaskActionTypes, taskReducer } from './taskReducer';

it('Should handle ADD_ALL', () => {
    const tasks: TaskRef[] = [
        {
            ref: null,
            data: {
                id: 1,
                name: 'test',
            },
        },
        {
            ref: null,
            data: {
                id: 1,
                name: 'test',
            },
        },
    ];
    const action: TaskAction = {
        type: TaskActionTypes.ADD_ALL,
        payload: tasks,
    };
    const expectedState = {
        taskList: tasks,
    };
    expect(
        taskReducer(
            {
                taskList: [],
            },
            action
        )
    ).toEqual(expectedState);
});
