import CardItemList from "./card-item/CardItemList";

export default function Card({card}) {
    return (<section className='card-container'>
        <h3 className='card-header'>Card Title</h3>
        <CardItemList></CardItemList>
    </section>)
}
