export default function CardItem({cardItem}) {

    return (<li className='card-item'>
        <h4 className='item-header'>Card Item TitleCard Item TitleCard Item TitleCard Item Title</h4>
        <section className="item-actions-container">
            <button id='edit_btn' className='item-actions'>
            </button>
            <button id='delete_btn' className='item-actions'>
            </button>
        </section>
    </li>)
}
