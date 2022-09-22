import CardItem from "./CardItem";
import AddCardItemForm from "./AddCardItemButton";

export default function CardItemList() {


    return (
        <>
            <ul className='card-item-list'>
                <CardItem cardItem={null}/>

            </ul>
            <AddCardItemForm/>
            <section className='delete-card-button'>
                <button id='delete_btn'>Delete</button>
            </section>
        </>
    )
}
