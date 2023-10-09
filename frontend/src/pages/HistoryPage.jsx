import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../scss/HistoryPage.scss';
import axios from '../axios';

export function HistoryPage() {
    const [card, setCard] = useState({});
    const [modal, setModal] = useState(false);
    const [modalFullCash, setModalFullCash] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadingData()
    });

    async function loadingData() {
        try {
            await axios.get('api/cards/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                },
                // sa beq e gnum, ev darnum e req.query
                params: { userId: id }
            }).then(res => {
                setCard(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const submitDeleteCard = async () => {
        if (card.card[0].price === 0) return setModal(true);
        else return setModalFullCash(true);
    }

    const removeCard = async () => {
        try {
            await axios.delete('api/cards/delete/' + id, { id }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                navigate('/');
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <i className='fa-solid fa-house' onClick={() => navigate('/')} />

            {/* ==================== modal windows ==================== */}
            <div className={modal ? 'modal activeModal' : 'modal'}>
                <div className='modalBackground' onClick={() => setModal(false)}></div>

                <div className='modalBody'>
                    <p>Do you really want to delete this card?</p>

                    <div className='buttonsModal'>
                        <button className='modal_btn_yes' onClick={removeCard}>Yes</button>
                        <button className='modal_btn_cancel' onClick={() => setModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className={modalFullCash ? 'modal activeModal' : 'modal'}>
                <div className='modalBackground' onClick={() => setModalFullCash(false)}></div>

                <div className='modalBody'>
                    <p>There is money on your card. You cannot delete this card. Transfer the money to another account and try to delete the card again.</p>
                    <button className='modal_btn_yes' onClick={() => setModalFullCash(false)}>Ok</button>
                </div>
            </div>

            {
                card._id &&
                <div className='HistoryPage' data-aos='zoom-in'>
                    {
                        card.card[0].title !== 'Savings' &&
                        card.card[0].title !== 'Donations' &&
                        card.card[0].title !== 'Goals' &&

                        <div className='editTools'>
                            <i
                                className='fa-solid fa-pen-to-square'
                                onClick={() => navigate(`/card/edit/${id}`)}
                            />

                            <i className='fa-solid fa-trash' onClick={submitDeleteCard}></i>
                        </div>
                    }

                    <div className='card'
                        style={{ background: card.card[0].bgColor }}
                    >
                        <div className='heading'>
                            <p className='title'>
                                {card.card[0].title}
                            </p>
                            <img src='/images/logo_black.png' alt='logo_black' />
                        </div>

                        <div className='chip'>
                            <img src='/images/chip.jpg' alt='chip' />
                            <p className='balans'>Balans
                                <span>${card.card[0].price.toLocaleString('en-US')}</span>
                            </p>
                        </div>

                        <div className='code'>
                            <p className='chipCode'>{card.cardNumber}</p>
                            <img src='/images/nfc.png' className='nfcImg' alt='nfc' />
                        </div>
                    </div>

                    <div className='history'>
                        <p className='heading'>Recent Transcations</p>

                        <div className='box-container'>
                            {
                                card.card[0].history.map((el, index) =>
                                    <div key={index} className='box'>
                                        <img
                                            src='/images/arrow.png'
                                            alt='arrow'
                                            className={el[0].includes('to') || el[0].includes('Out') ? '' : 'rotateArrow'}
                                        />
                                        <p style={{ width: '35%', textAlign: 'left' }}>{el[0]}</p>
                                        <p style={{ width: '30%', textAlign: 'right' }}>{el[1]}</p>
                                        <p style={{ width: '25%', textAlign: 'right' }}>{el[2]}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}