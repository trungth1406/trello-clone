import Card from "./Card";
import {useState} from "react";
import {CardModel} from "../../models/card-model";

const DEFAULT_CARD: CardModel = {
    name: null,
    items: []
}

export default function CardList() {
    const [cards, setCards] = useState<CardModel[]>([DEFAULT_CARD]);
    return (
        <ul className='card-list'>
            {cards.map((card, index) => <Card key={index} card={card}/>)}
        </ul>)
}
