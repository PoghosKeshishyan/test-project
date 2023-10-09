import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ModalV2 } from './ModalV2';
import axios from '../axios';

export function CashInput() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [modal, setModal] = useState(false);
  const [editInput, setEditInput] = useState(true);
  const [modalText, setModalText] = useState('');
  const [input, setInput] = useState('');
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadingData();
  });

  const loadingData = async() => {
    try {
      await axios.get('api/cards/', {
        headers: {
          'Content-Type': 'application/json',
        },
        // sa beq e gnum, ev darnum e req.query
        params: { userId }
      }).then(res => {
        setCards(res.data);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSelect = (e) => {
    const res = cards.filter(el => el._id === e.target.value);
    setCurrentCard(res[0]);
    setEditInput(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!input || input < 0) {
      setModal(true);
      return setModalText('The field must be filled and the value of the number must be greater than 0.');
    }

    if (input[0] === 0 && input[1] !== '.') {
      setModal(true);
      return setModalText('After 0 you need to add "." or ', '');
    }

    // today date
    const date = new Date();
    const month = String(date.getMonth()).length === 1 ? '0' + 
                  (date.getMonth() + 1) : date.getMonth() + 1;
    const day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate();
    const today = `${month}.${day}.${date.getFullYear()}`;

    const newHistory = ['Cash Input', today, `+$${input}`];
    currentCard.card[0].price += Number(input);
    currentCard.card[0].history = [newHistory, ...currentCard.card[0].history];

    await axios.put(`api/cards/cash/card/${currentCard._id}`, { card: currentCard }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    navigate('/');
  }


  return (
    <>
      <ModalV2 modal={modal} setModal={setModal} modalText={modalText} />

      <form className='cashForm' onSubmit={onSubmit} data-aos='zoom-in'>
        <select className='cashInputSelect' defaultValue='Accounts' onChange={onChangeSelect}>
          <option defaultValue="Accounts" disabled>Accounts</option>
          {
            cards.map(el => <option key={el._id} value={el._id}>
              {el.card[0].title}
            </option>)
          }
        </select>

        <input
          type='number'
          value={input}
          placeholder='0.00'
          disabled={editInput}
          className='cashInputText'
          onChange={e => setInput(e.target.value)}
        />

        <button className='cashInputButton'>Add</button>
      </form>
    </>
  )
}






