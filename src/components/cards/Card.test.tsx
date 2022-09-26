import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import Card from './Card';

// Test the Card component
describe('When Card component mounted', () => {
    render(
        <Card
            card={{ name: null, items: [] }}
            onCardDelete={undefined}
        />
    );

    it('Should show an input field to add a card title when the card name is null', async () => {
        const snapshotComp = renderer.create(
            <Card
                card={{ name: null, items: [] }}
                onCardDelete={undefined}
            />
        );

        expect(screen.getByTestId('card_title_input')).toBeTruthy();
        expect(screen.getByTestId('card_title_input')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('Card Title')).toBeTruthy();

        expect(snapshotComp.toJSON()).toMatchSnapshot();
    });

    it('Should show the card title when focus on the input field and enter a card title', async () => {
        render(
            <Card
                card={{ name: null, items: [] }}
                onCardDelete={undefined}
            />
        );

        fireEvent.focus(screen.getByTestId('card_title_input'));

        fireEvent.change(screen.getByTestId('card_title_input'), {
            target: { value: 'Card Title' },
        });

        fireEvent.keyDown(screen.getByTestId('card_title_input'), {
            key: 'Enter',
            code: 'Enter',
        });

        expect(screen.getByText('Card Title')).toBeTruthy();
    });

    it('Should show card header if card already had a name', async () => {
        // click on the delete button
        render(
            <Card
                card={{ name: 'Card Title', items: [] }}
                onCardDelete={undefined}
            />
        );

        expect(screen.queryByTestId('card_title_input')).toBeNull();
        // Expect the card header to be shown
        expect(screen.getByTestId('card_header')).toBeTruthy();
        expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    describe('When click on the Card header', () => {
        render(
            <Card
                card={{ name: 'Card Title', items: [] }}
                onCardDelete={undefined}
            />
        );
        it('Should show the input field to edit the card title when click on the card header', async () => {
            render(
                <Card
                    card={{ name: 'Card Title', items: [] }}
                    onCardDelete={undefined}
                />
            );
            fireEvent.click(screen.getByTestId('card_header'));

            expect(screen.getByTestId('card_title_input')).toBeTruthy();
        });

        it('Should update the card header after editing the card title', async () => {
            render(
                <Card
                    card={{ name: 'Card Title', items: [] }}
                    onCardDelete={undefined}
                />
            );
            fireEvent.click(screen.getByTestId('card_header'));

            fireEvent.change(screen.getByTestId('card_title_input'), {
                target: { value: 'New Card Title' },
            });

            fireEvent.keyDown(screen.getByTestId('card_title_input'), {
                key: 'Enter',
                code: 'Enter',
            });

            expect(screen.getByText('New Card Title')).toBeTruthy();
        });
    });

    
    
});
