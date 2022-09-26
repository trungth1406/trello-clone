import Card from "../Card";
import {useState} from "react";
import {CardModel} from "../../../models/card-model";
import AddCardButton from "../AddCardButton";

const DEFAULT_CARD: CardModel = {
    id: Math.random(),
    name: 'Default Card',
    items: []
}

export default function CardList() {
    const [cards, setCards] = useState<CardModel[]>([DEFAULT_CARD]);

    const addCard = () => {
        setCards(last => [...last, {
            id: Math.random(),
            name: null,
            items: []
        }]);
    }

    const deleteCard = (card: CardModel) => {
        setCards(lastCards => [...lastCards.filter(c => c !== card)]);
    }

    return (
        <ul className='card-list'>
            {cards.map((card, index) => <Card  key={'cardNo' + card.id} card={card} onCardDelete={deleteCard}/>)}
            <AddCardButton  onAddNewCard={addCard}/>
        </ul>)
}
