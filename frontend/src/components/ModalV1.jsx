import { Link } from 'react-router-dom';

export function ModalV1({ modal, setModal, modalMessage, navigatePage }) {
  return (
    <div className={modal ? 'modal activeModal' : 'modal'}>
      <div className='modalBackground' onClick={() => setModal(false)}></div>

      <div className='modalBody'>
        <p>{modalMessage}</p>

        <div className='buttonsModal'>
          <Link to={navigatePage} className='modal_btn_yes'>Yes</Link>
          <button className='modal_btn_cancel' onClick={() => setModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
