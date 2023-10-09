import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import '../scss/TransferPage.scss';

export function TransferPage() {
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [cardFrom, setCardFrom] = useState({});
  const [cardTo, setCardTo] = useState({});
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const [inputWitfTransferTofriends, setInputWitfTransferTofriends] = useState('');
  const [activeRoute, setActiveRoute] = useState(true);
  const { userId } = useContext(AuthContext);

  useEffect(() => { 
    loadingDatas() 
  });

  const handleModalYesBtn = () => setModal(false);

  const onChangeSelectFrom = (e) => {
    const res = cards.filter(el => el._id === e.target.value);
    setCardFrom(res[0]);
  }

  const onChangeSelectTo = (e) => {
    const res = cards.filter(el => el._id === e.target.value);
    setCardTo(res[0]);
  }

  async function loadingDatas() {
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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!input || input < 0) {
      setModal(true);
      return setModalText('The field must be filled and the value of the number must be greater than 0.');
    }

    if (input[0] === '0' && input[1] !== '.') {
      setModal(true);
      return setModalText('After 0 you need to add "." or ","');
    }

    if (cardFrom.card[0].price < input) {
      setModal(true);
      return setModalText('You cannot select a number greater than the value.');
    }

    if (cardFrom.card[0].title === cardTo.card[0].title) {
      setModal(true);
      return setModalText('You cannot transfer to the same card. Change one of the cards.');
    }

    cardFrom.card[0].price -= input;
    cardTo.card[0].price += Number(input);

    // today
    const date = new Date();
    const month = String(date.getMonth()).length === 1 ? '0' + 
                  (date.getMonth() + 1) : date.getMonth() + 1;
    const day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate();
    const today = `${month}.${day}.${date.getFullYear()}`;
    
    const newFromHistory = [`to ${cardTo.card[0].title}`, today, `-$${input}`];
    const newToHistory = [`from ${cardFrom.card[0].title}`, today, `+$${input}`];
    cardFrom.card[0].history = [newFromHistory, ...cardFrom.card[0].history];
    cardTo.card[0].history = [newToHistory, ...cardTo.card[0].history];

    await axios.put(`api/cards/cash/card/${cardFrom._id}`, { card: cardFrom }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    await axios.put(`api/cards/cash/card/${cardTo._id}`, { card: cardTo }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    navigate('/');
  }

  const transferToFriendsHandler = async (e) => {
    e.preventDefault();

    if (!inputWitfTransferTofriends.trim()) return;

    await axios.get(`api/auth`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      const allUsers = response.data;
      const inputValue = inputWitfTransferTofriends.toLowerCase();

      const newUsers = allUsers.filter(user => user.name.toLowerCase().includes(inputValue));
      setUsers(newUsers);
    })

  }


  return (
    <>
      <i className="fa-solid fa-house" onClick={() => navigate('/')} />

      <div className={modal ? 'modal activeModal' : 'modal'}>
        <div className='modalBackground' onClick={() => setModal(false)}></div>

        <div className='modalBody'>
          <p>{modalText}</p>
          <button className="modal_btn_yes" onClick={handleModalYesBtn}>Yes</button>
        </div>
      </div>

      <div className="TransferPage">
        <div className="contorolBtns">
          <button
            className={activeRoute ? 'active' : ''}
            onClick={() => setActiveRoute(!activeRoute)}
          >
            Transfer betwen my account
          </button>


          <button
            className={!activeRoute ? 'active' : ''}
            onClick={() => setActiveRoute(!activeRoute)}
          >
            Transfer to friends
          </button>
        </div>

        {
          activeRoute &&
          <form onSubmit={onSubmit}>
            <div className="box">
              <p className='text'>From</p>

              <select
                className='selectTransfer'
                defaultValue="Accounts"
                onChange={onChangeSelectFrom}
              >
                <option value="Accounts" disabled="disabled">Accounts</option>
                {cards.map((el, index) => <option value={el._id} key={el._id}>{el.card[0].title}</option>)}
              </select>
            </div>

            <div className="box">
              <p className='text'>To</p>

              <select
                className='selectTransfer'
                defaultValue="Accounts"
                onChange={onChangeSelectTo}
              >
                <option value="Accounts" disabled="disabled">Accounts</option>
                {cards.map((el, index) => <option value={el._id} key={el._id}>{el.card[0].title}</option>)}
              </select>
            </div>

            <div className="box">
              <p className='text'>Amount</p>

              <input
                type="number"
                className='inputTransfer'
                value={input}
                placeholder='0.00'
                onChange={e => setInput(e.target.value)}
              />
            </div>

            <button className='btn'>Send</button>
          </form>
        }

        {
          !activeRoute &&
          <>
            <form className='transferToFriends' onSubmit={transferToFriendsHandler}>

              <p>Search your friend name <br /> with name of account</p>

              <input type="text"
                value={inputWitfTransferTofriends}
                onChange={e => setInputWitfTransferTofriends(e.target.value)}
              />

              <input type="submit" value='Search' className='btn' />

            </form>

            <div className='users'>

              {
                users.map((user, index) => <div className='user' key={index}>
                  <p> <b>User Name:</b> {user.name}</p>
                  <p> <b>Email:</b> {user.email}</p>
                  <button className='btn' onClick={() => navigate('/transfer-to-friend/' + user._id)}>
                    Select account
                  </button>
                </div>)
              }

            </div>

          </>

        }
      </div>

    </>
  )
}

