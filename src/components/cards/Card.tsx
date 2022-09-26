import TaskList from "./tasks/TaskList";
import {useEffect, useState} from "react";

export default function Card({card, onCardDelete}) {

    const [isEditing, setIsEditing] = useState(card.name === null);
    const [cardDetail, setCardDetails] = useState({
        name: card.name,
        items: card.items
    });


    useEffect(() => {
        setIsEditing(cardDetail.name === null);
    }, [cardDetail]);


    const updateCardTitle = (event) => {
        if (event.key === 'Enter') {
            setCardDetails({
                ...cardDetail,
                name: event.target.value
            });
        } else {
            card.name = event.target.value;
        }
    }
    const deleteCard = () => {
        onCardDelete(card);
    }



    return (<li className='card-container' data-testid='card'>
        {isEditing ? <input
                data-testid='card_title_input'
                type="text"
                            className='card-title'
                            placeholder='Card Title'
                            onKeyDown={updateCardTitle}/> :
            <h3 className='card-header' onClick={() => setIsEditing(prev => !prev)}>{cardDetail.name}</h3>
        }
        {cardDetail.name && <TaskList cardDetail={cardDetail}/>}
        <section className='delete-card-button' onClick={deleteCard}>
            <button id='delete_btn'>Delete</button>
        </section>
    </li>)
}
