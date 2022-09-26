import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../../Card';

describe('AddTaskForm renders with a Card that already had a title', () => {
    it('Should show an input and a button', async () => {
        render(
            <Card
                card={{ name: 'Card Title', items: [] }}
                onCardDelete
            />
        );

        expect(screen.getByTestId('task_input')).toBeTruthy();
        expect(screen.getByTestId('task_input')).toBeInTheDocument();

        expect(screen.getByTestId('add-task_btn')).toBeTruthy();
        expect(screen.getByTestId('add-task_btn')).toBeInTheDocument();
    });

    describe('When interact with the input and button', () => {
        describe('when the input is empty', () => {
            it('should not show the error', () => {
                render(
                    <Card
                        card={{ name: 'Card Title', items: [] }}
                        onCardDelete
                    />
                );
                fireEvent.change(screen.getByTestId('task_input'), {
                    target: { value: '' },
                });

                // state is updated
                expect(screen.getByTestId('task_input')).toHaveValue('');

                // error is not shown
                expect(screen.queryByTestId('error')).not.toBeInTheDocument();
            });
        });

        describe('when the input is not empty', () => {
            it('should change the task name state', () => {
                render(
                    <Card
                        card={{ name: 'Card Title', items: [] }}
                        onCardDelete
                    />
                );
                fireEvent.change(screen.getByTestId('task_input'), {
                    target: { value: 'Task Name' },
                });

                // state is updated
                expect(screen.getByTestId('task_input')).toHaveValue(
                    'Task Name'
                );
            });
        });

        describe('on last key up', () => {
            describe('if the input value is empty', () => {
                it('should not add a task and show error', () => {
                    render(
                        <Card
                            card={{ name: 'Card Title', items: [] }}
                            onCardDelete
                        />
                    );

                    fireEvent.change(screen.getByTestId('task_input'), {
                        target: { value: 'A' },
                    });

                    // state is updated
                    expect(screen.getByTestId('task_input')).toHaveValue('A');

                    userEvent.click(screen.getByTestId('task_input'));
                    userEvent.keyboard('{enter}');

                    // state is updated
                    expect(screen.getByTestId('task_input')).toHaveValue('A');

                    expect(screen.queryByTestId('input_error')).not.toBeInTheDocument();

                    userEvent.click(screen.getByTestId('task_input'));
                    userEvent.keyboard('{backspace}');

                    // state is updated
                    expect(screen.getByTestId('task_input')).toHaveValue('');

                    // after rerendering, error is shown
                    expect(
                        screen.getByTestId('input_error')
                    ).toBeInTheDocument();
                });
            });
        });
    });
});
