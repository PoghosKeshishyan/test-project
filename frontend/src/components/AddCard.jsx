import { useNavigate } from 'react-router-dom';

export function AddCard() {
    const navigate = useNavigate();

    const onClickHandler = () => {
        setTimeout(() => { navigate('/card/add') }, 200)
    }

    return (
        <div className='addCard' onClick={onClickHandler}>
            <p className='addBtn'>Add Card</p>

            <div className='heading'>
                <p className='title'>Card name</p>
                <img src='/images/logo_black.png' alt='' />
            </div>

            <div className='chip'>
                <img src='/images/chip.jpg' alt='chip' />
                <p className='balans'>Balans <span>$0</span></p>
            </div>

            <div className='code'>
                <p className='chipCode'>0000 0000 0000 0020</p>
                <img src='/images/nfc.png' className='nfcImg' alt='nfc' />
            </div>
        </div>
    )
}
