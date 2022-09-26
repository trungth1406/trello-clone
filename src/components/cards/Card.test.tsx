import {render, screen} from "@testing-library/react";
import renderer from 'react-test-renderer';
import {act} from "react-dom/test-utils";
import Card from "./Card";

// Test the Card component
describe('When Card component mounted', () => {



    render(<Card card={{name: null, items: []}} onCardDelete={undefined}/>);
    // it should show an input field to add a card title when the card name is null
    it('Should show an input field to add a card title when the card name is null', async () => {
        // render the card component
        const snapshotComp = renderer.create(<Card card={{name: null, items: []}} onCardDelete={undefined}/>);
        // expect to find an input field with id 'card_title_input'
        expect(screen.getByTestId('card_title_input')).toBeTruthy();
        expect(screen.getByTestId('card_title_input')).toBeInTheDocument();
        // this input field should have a placeholder 'Card Title'
        expect(screen.getByPlaceholderText('Card Title')).toBeTruthy();

        expect(snapshotComp.toJSON()).toMatchSnapshot();


    });

    // When focus on the input field and enter a card title, it should show the card title
    it('Should show the card title when focus on the input field and enter a card title', async () => {

        render(<Card card={{name: null, items: []}} onCardDelete={undefined}/>);
        // focus on the input field
        act(() => {
            screen.getByTestId('card_title_input').focus();
        });

        // enter a card title
        act(() => {
            (screen.getByTestId('card_title_input')as HTMLInputElement).value = 'Card Title';
        });

        // press enter
        act(() => {
            screen.getByTestId('card_title_input').dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        });

        render(<Card card={{name: 'Card Title', items: []}} onCardDelete={undefined}/>);
        // expect to find the card title
        expect(screen.getByText('Card Title')).toBeTruthy();

    });

    // When click on the delete button, it should delete the card
    it('Should show card header if card already had a name', async () => {
        // click on the delete button
        render(<Card card={{name: 'Card Title', items: []}} onCardDelete={undefined}/>);
        // Expect the input to be hidden
        expect(screen.queryByTestId('card_title_input')).toBeNull();
        // Expect the card header to be shown
        expect(screen.getByTestId('card_header')).toBeTruthy();

    });

})
