import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
import '../scss/TransferToFriendPage.scss';
import axios from '../axios';

export function TransferToFriendPage() {
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const [editInput, setEditInput] = useState(true);
    const [input, setInput] = useState('');
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({});
    const { userId } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadingData()
    });

    const onChangeSelect = (e) => {
        const res = cards.filter(el => el._id === e.target.value);
        setCard(res[0]);
        setEditInput(false);
    }

    async function loadingData() {
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

    const submitHandler = async (e) => {
        e.preventDefault();

        if (Number(input) > card.card[0].price) {
            setModal(true);
            return setModalText('You cannot select a number greater than the value.');
        }

        await axios.post('api/auth/transfer/user/' + card._id, { friendUserId: id, input, card, userId }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            navigate('/')
        })
    }

    return (
        <div className="TransferToFriendPage">
            <i className="fa-solid fa-house" onClick={() => navigate('/')} />

            <div className={modal ? 'modal activeModal' : 'modal'}>
                <div className='modalBackground' onClick={() => setModal(false)}></div>

                <div className='modalBody'>
                    <p>{modalText}</p>
                    <button className="modal_btn_yes" onClick={() => setModal(false)}>Ok</button>
                </div>
            </div>

            <form onSubmit={submitHandler}>
                <p>Choose from which of your account the money should be transferred.</p>

                <div className="inner">
                    <select
                        className='selectTransfer'
                        defaultValue="Accounts"
                        onChange={onChangeSelect}
                    >
                        <option value="Accounts" disabled="disabled">Accounts</option>
                        {cards.map(el => <option value={el._id} key={el._id}>{el.card[0].title}</option>)}
                    </select>

                    <input
                        type='number'
                        value={input}
                        placeholder='0.00'
                        disabled={editInput}
                        onChange={e => setInput(e.target.value)}
                    />

                    <input type="submit" value="Send" className="btn" />
                </div>
            </form>

            <div className="content">
                <p>Write how much money you want to transfer to your friend's account. Your transferred amount will be transferred to your friend's "Savings" card.</p>
            </div>
        </div>
    )
}
