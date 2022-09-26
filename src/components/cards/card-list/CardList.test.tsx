// test that it Should render a single list of card\
//
import {render, screen} from "@testing-library/react";
import renderer from 'react-test-renderer';
import {act} from "react-dom/test-utils";
import CardList from "./CardList";


describe('When CardList mounted', () => {

    const cardListComponent = renderer.create(<CardList/>);
    const cardListTree = cardListComponent.toJSON();

    it('Should render a circle button to add a card', async () => {
        render(<CardList/>);
        expect(cardListTree['children']).toBeTruthy();
        expect(cardListTree['type']).toBe('ul');
        expect(cardListTree['children']).toHaveLength(2);

        // expect to find a button with id 'add-card_btn'
        expect(screen.getByTestId('add-card_btn')).toBeTruthy();
        expect(screen.getByTestId('add-card_btn')).toBeInTheDocument();

    })


    it('Should render a default card', async () => {
        render(<CardList/>);
        expect(screen.getAllByTestId('card')).toHaveLength(1);
        // expect the card to have the header  equal to 'Default Card' with screen
        expect(screen.getByText('Default Card')).toBeInTheDocument();

    });

    // When click on the add card button, it should add a new card
    it('Should add a new card when click on the add card button', async () => {
        // click on the add card button
        render(<CardList/>);
        act(() => {
            screen.getByTestId('add-card_btn').click();
        });
        expect(screen.getAllByTestId('card')).toHaveLength(2);
        // and expect it to match the snapshot
        expect(cardListComponent.toJSON()).toMatchSnapshot();
    });


});
