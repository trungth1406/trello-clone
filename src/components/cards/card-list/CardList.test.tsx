// test that it Should render a single list of card\
//
import {render} from "@testing-library/react";
import renderer from 'react-test-renderer';
import CardList from "./CardList";

describe('When CardList mounted', () => {
    render(<CardList/>);
    const cardListComponent = renderer.create(<CardList/>);
    const cardListTree = cardListComponent.toJSON();

    it('Should render a single list of card', async () => {
        expect(cardListComponent).toMatchSnapshot();
        expect(cardListTree['type']).toBe('ul');


    });

    it('Should render a circle button to add a card', async () => {
        expect(cardListTree['children']).toBeTruthy();
        expect(cardListTree['children']).toHaveLength(2);
    })


    it('Should render a default card', async () => {

    });
});
