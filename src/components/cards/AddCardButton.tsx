export default function AddCardButton({onAddNewCard}) {
    return (
        <button className='add-card-button' onClick={onAddNewCard}>
            <i className="fa fa-plus"></i>
        </button>
    )
}
