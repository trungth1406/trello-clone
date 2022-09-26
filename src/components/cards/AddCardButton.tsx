export default function AddCardButton({onAddNewCard}) {
    return (
        <button
            data-testid='add-card_btn'
            id='add-card_btn'
            className='add-card-button' onClick={onAddNewCard}>
            <i className="fa fa-plus"></i>
        </button>
    )
}
