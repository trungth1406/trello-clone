import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../../Card';

describe('When a Card with title is represented with a Task', () => {
    describe('and click on the edit button', () => {
        it('Should show the input to edit the task name and focus on it', () => {
            render(
                <Card
                    card={{
                        name: 'Card Title',
                        items: [
                            {
                                id: 'task01',
                                name: 'Task Name',
                            },
                        ],
                    }}
                    onCardDelete
                />
            );

            // edit_task_input

            fireEvent.click(screen.getByTestId('edit-task_btn'));

            expect(screen.getByTestId('edit_task_input')).toBeInTheDocument();
            expect(
                screen.getByTestId('edit_task_input') as HTMLInputElement
            ).toHaveValue('Task Name');

            // should be focused
            expect(
                screen.getByTestId('edit_task_input') as HTMLInputElement
            ).toHaveFocus();

            // change the task name
        });
    });

    describe('and click on the edit button and press enter', () => {
        it('Should update the task name', () => {
            render(
                <Card
                    card={{
                        name: 'Card Title',
                        items: [
                            {
                                id: 'task01',
                                name: 'Task Name',
                            },
                        ],
                    }}
                    onCardDelete
                />
            );

            fireEvent.click(screen.getByTestId('edit-task_btn'));

            expect(screen.getAllByTestId('edit_task_input')).toHaveLength(1);

            fireEvent.change(screen.getByTestId('edit_task_input'), {
                target: { value: 'Task Name 2' },
            });

            userEvent.keyboard('{enter}');

            expect(screen.getByText('Task Name 2')).toBeInTheDocument();
        });
    });
});
