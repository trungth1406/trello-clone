export default function CardItem({cardItem}) {

    return (<li className='card-item'>
        <h4 className='item-header'>Card Item Title</h4>
        <section className="item-actions-container">
            <button className='item-actions'>
                <i className="fa fa-pen"></i>
            </button>
            <button className='item-actions'>
                <i className="fa fa-trash"></i>
            </button>
        </section>
    </li>)
}
