import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ModalV2 } from '../components/ModalV2';
import '../scss/AddCardPage.scss';
import axios from '../axios';

export function AddCardPage() {
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [bgColor, setBgColor] = useState('rgb(255 255 255)');
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const changeBgColorHandler = (e) => {
    if(e.target.style.backgroundColor) {
      setBgColor(e.target.style.backgroundColor);
    }
  }

  const submitButton = async () => {
    if (!inputValue) return setModal(true);

    const newCard = {
      title: inputValue,
      price: 0,
      history: [],
      bgColor,
    }

    try {
      await axios.post('api/cards/add', { newCard, userId }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    } catch (error) {
      console.log(error);
    }

    navigate('/');
  }

  return (
    <>
      <i className='fa-solid fa-house' onClick={() => navigate('/')} />

      <ModalV2 
        modal={modal} 
        setModal={setModal} 
        modalText={'You must fill in the "Card name" field.'} 
      />

      <div className='AddCardPage' data-aos='zoom-in'>
        <form onSubmit={e => e.preventDefault()}>
          <h2>Add new card</h2>

          <input 
            type='text' 
            placeholder='Card name...' 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
          />

          <div className='colors'>
            <p>Card color</p>

            <div className='content' onClick={changeBgColorHandler} >
              <div style={{ backgroundColor: 'rgb(168 162 158)' }} />
              <div style={{ backgroundColor: 'rgb(255 255 255)' }} />
              <div style={{ backgroundColor: 'rgb(253 186 116)' }} />
              <div style={{ backgroundColor: 'rgb(252 211 77)' }} />
              <div style={{ backgroundColor: 'rgb(134 239 172' }} />
              <div style={{ backgroundColor: 'rgb(74 222 128)' }} />
              <div style={{ backgroundColor: 'rgb(52 211 153)' }} />
              <div style={{ backgroundColor: 'rgb(45 212 191)' }} />
              <div style={{ backgroundColor: 'rgb(34 211 238)' }} />
              <div style={{ backgroundColor: 'rgb(56 189 248)' }} />
              <div style={{ backgroundColor: 'rgb(96 165 250)' }} />
              <div style={{ backgroundColor: 'rgb(129 140 248)' }} />
              <div style={{ backgroundColor: 'rgb(244 114 182)' }} />
              <div style={{ backgroundColor: 'rgb(251 113 133)' }} />
            </div>
          </div>

          <div className='card' style={{ background: bgColor }}>
            <div className='heading'>
              <p>{inputValue}</p>
              <img src='/images/logo_black.png' alt='logo_black' />
            </div>

            <div className='chip'>
              <img src='/images/chip.jpg' alt='chip' />
              <p className='balans'>Balans <span>$0</span></p>
            </div>

            <div className='code'>
              <p className='chipCode'>0000 0000 0000 0000</p>
              <img src='/images/nfc.png' className='nfcImg' alt='nfc' />
            </div>
          </div>

          <button onClick={submitButton} className='btn'>Add card</button>
        </form>
      </div>
    </>
  )
}
