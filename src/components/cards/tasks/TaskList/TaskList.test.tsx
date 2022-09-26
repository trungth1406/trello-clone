import { fireEvent, render, screen } from '@testing-library/react';
import Card from '../../Card';

describe('When a Card with title is represented and the TaskForm is shown', () => {
    describe('Enter a valid task name and click on add button', () => {
        it('Should add a task', () => {
            render(
                <Card
                    card={{ name: 'Card Title', items: [] }}
                    onCardDelete
                />
            );
            fireEvent.change(screen.getByTestId('task_input'), {
                target: { value: 'Task Name' },
            });

            expect(screen.getByTestId('task_input')).toHaveValue('Task Name');

            fireEvent.click(screen.getByTestId('add-task_btn'));

            expect(screen.getByTestId('task_input')).toHaveValue('Task Name');

            expect(screen.getByText('Task Name')).toBeInTheDocument();
        });
    });

    describe('When a  task is added', () => {
        describe('and click on the edit button', () => {
            it('Should show the input to edit the task name', () => {
                render(
                    <Card
                        card={{ name: 'Card Title', items: [] }}
                        onCardDelete
                    />
                );
                fireEvent.change(screen.getByTestId('task_input'), {
                    target: { value: 'Task Name' },
                });

                expect(screen.getByTestId('task_input')).toHaveValue(
                    'Task Name'
                );

                fireEvent.click(screen.getByTestId('add-task_btn'));

                expect(screen.getByTestId('task_input')).toHaveValue('Task Name');

                expect(screen.getByText('Task Name')).toBeInTheDocument();

                fireEvent.click(screen.getByTestId('edit-task_btn'));

                expect(
                    screen.getByTestId('edit_task_input')
                ).toBeInTheDocument();
                expect(
                    screen.getByTestId('edit_task_input') as HTMLInputElement
                ).toHaveValue('Task Name');

                // change the task name
                fireEvent.change(screen.getByTestId('edit_task_input'), {
                    target: { value: 'Task Name 2' },
                });

                expect(
                    screen.getByTestId('edit_task_input') as HTMLInputElement
                ).toHaveValue('Task Name 2');

                // press enter and the task name should be updated
                fireEvent.keyDown(screen.getByTestId('edit_task_input'), {
                    key: 'Enter',
                    code: 'Enter',
                });

                expect(screen.getByText('Task Name 2')).toBeInTheDocument();
            });
        });
        describe('and click on the delete button', () => {
            it('Should delete the task', () => {
                render(
                    <Card
                        card={{ name: 'Card Title', items: [] }}
                        onCardDelete
                    />
                );
                fireEvent.change(screen.getByTestId('task_input'), {
                    target: { value: 'Task Name' },
                });

                expect(screen.getByTestId('task_input')).toHaveValue(
                    'Task Name'
                );

                fireEvent.click(screen.getByTestId('add-task_btn'));

                expect(screen.getByTestId('task_input')).toHaveValue('Task Name');

                expect(screen.getByText('Task Name')).toBeInTheDocument();

                fireEvent.click(screen.getByTestId('delete-task_btn'));

                expect(screen.queryByText('Task Name')).not.toBeInTheDocument();
            });
        });
    });
});
