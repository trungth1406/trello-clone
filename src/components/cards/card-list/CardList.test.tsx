// test that it Should render a single list of card\
//
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import CardList from './CardList';

describe('When CardList mounted', () => {
    const cardListComponent = renderer.create(<CardList />);
    const cardListTree = cardListComponent.toJSON();

    it('Should render a circle button to add a card', async () => {
        render(<CardList />);
        expect(cardListTree['children']).toBeTruthy();
        expect(cardListTree['type']).toBe('ul');
        expect(cardListTree['children']).toHaveLength(2);

        // expect to find a button with id 'add-card_btn'
        expect(screen.getByTestId('add-card_btn')).toBeTruthy();
        expect(screen.getByTestId('add-card_btn')).toBeInTheDocument();
    });

    it('Should render a default card', async () => {
        render(<CardList />);
        expect(screen.getAllByTestId('card')).toHaveLength(1);
        // expect the card to have the header  equal to 'Default Card' with screen
        expect(screen.getByText('Default Card')).toBeInTheDocument();

        expect(screen.getByTestId('delete_btn')).toBeTruthy();
        expect(screen.getAllByTestId('delete_btn')).toHaveLength(1);
        expect(cardListTree).toMatchSnapshot();
    });

    // When click on the add card button, it should add a new card
    it('Should add a new card when click on the add card button', async () => {
        // click on the add card button

        render(<CardList />);
        fireEvent.click(screen.getByTestId('add-card_btn'));
        expect(screen.getAllByTestId('card')).toHaveLength(2);
    });

    // When click on the delete button, it should delete the card
    it('Should delete the card when click on the delete button', async () => {
        render(<CardList />);
        fireEvent.click(screen.getByTestId('delete_btn'));
        expect(screen.queryAllByTestId('card')).toHaveLength(0);
    });

    describe('when done giving task a name and click on the add task  button', () => {
        it('should update the task list', () => {
            render(<CardList />);
            fireEvent.change(screen.getByTestId('task_input'), {
                target: { value: 'Task Name' },
            });

            fireEvent.click(screen.getByTestId('add-task_btn'));

            expect(screen.getByText('Task Name')).toBeTruthy();
        });
    });

    
});
