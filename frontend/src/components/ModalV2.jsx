export function ModalV2({modal, setModal, modalText}) {
    return (
        <div className={modal ? 'modal activeModal' : 'modal'}>
            <div className='modalBackground' onClick={() => setModal(false)}></div>

            <div className='modalBody'>
                <p>{modalText}</p>
                <button className='modal_btn_yes' onClick={() => setModal(false)}>Yes</button>
            </div>
        </div>
    )
}
