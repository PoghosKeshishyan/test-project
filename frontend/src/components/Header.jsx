import React, { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink, Link } from 'react-router-dom';
import axios from '../axios';
import '../scss/Header.scss';

export function Header() {
    const {name, avatar, logout, userId} = useContext(AuthContext);
    const [modal, setModal] = useState(false);
    const [cards, setCards] = useState([]);
    const [modalDeleteAccount, setModalDeleteAccount] = useState(false);
    const [confirmDeleteAccountModal, setConfirmDeleteAccountModal] = useState(false)
    const [menuOpened, setMenuOpened] = useState(false);
    const [settingsOpened, setSettingsOpened] = useState(false);
    const [inputChecked, setInputChecked] = useState(false);
    const navRef = useRef(null);
    const settRef = useRef(null);

    useEffect(() => {
        loadingData();
        window.addEventListener('mousedown', handleClickOutSide);
    })

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

        // loading Display Theme
        if (localStorage.getItem('myOwnBank_theme') === 'dark') {
            document.querySelector('body').classList.add('active');
            setInputChecked(true);
        }
    }

    const handleClickOutSide = (e) => {
        try {
            if (!navRef.current.contains(e.target)) {
                if (e.target.className !== 'img') setMenuOpened(false);
                setTimeout(() => setMenuOpened(false), 100);
            };

            if (!settRef.current.contains(e.target.parentElement)) {
                setSettingsOpened(false);
            };

            if (e.target.tagName === 'A') {
                setTimeout(() => setSettingsOpened(false), 100);
            };
        } catch { }
    }

    const darkModeFunc = () => {
        document.querySelector('body').classList.toggle('active');

        if (localStorage.getItem('myOwnBank_theme') !== 'dark') {
            localStorage.setItem('myOwnBank_theme', 'dark');
        } else {
            localStorage.setItem('myOwnBank_theme', 'light');
        };

        setInputChecked(!inputChecked);
    }

    const deleteAccountFunction = async () => {
        let sum = 0;

        for (let i = 0; i < cards.length; i++) {
            sum += cards[i].card[0].price;
        }

        if (sum === 0) {
            setSettingsOpened(false);
            setConfirmDeleteAccountModal(true);
            return;
        }

        setSettingsOpened(false)
        setModalDeleteAccount(true);
    }

    const confirmDeleteAccountFunction = async () => {
        await axios.delete(`api/auth/delete/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            logout();
        })

    }

    return (
        <React.Fragment>
            <div className={modal ? 'modal activeModal' : 'modal'}>
                <div className='modalBackground' onClick={() => setModal(false)}></div>

                <div className='modalBody'>
                    <p>Are you sure you want to log out of your account?</p>

                    <div className='buttonsModal'>
                        <button onClick={logout} className='modal_btn_yes'>Yes</button>
                        <button className='modal_btn_cancel' onClick={() => setModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>

            {/* ============= delete account modal ============= */}
            <div className={modalDeleteAccount ? 'modal activeModal' : 'modal'}>
                <div className='modalBackground' onClick={() => setModalDeleteAccount(false)}></div>

                <div className='modalBody'>
                    <p>There is money on your cards. You cannot delete this account. Transfer the money to another account and try to delete the account again.
                    </p>
                    <div className='buttonsModal'>
                        <button onClick={() => setModalDeleteAccount(false)} className='modal_btn_yes'>Ok</button>
                    </div>
                </div>
            </div>

            {/* ============= confirm delete account modal ============= */}
            <div className={confirmDeleteAccountModal ? 'modal activeModal' : 'modal'}>
                <div className='modalBackground' onClick={() => setConfirmDeleteAccountModal(false)}></div>

                <div className='modalBody'>
                    <p>Are you sure? that you want to delete your account?</p>

                    <div className='buttonsModal'>
                        <button onClick={confirmDeleteAccountFunction} className='modal_btn_yes'>Yes</button>
                        <button className='modal_btn_cancel' onClick={() => setConfirmDeleteAccountModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>

            <header>
                <i
                    ref={navRef}
                    className='fa-solid fa-bars'
                    onClick={() => setMenuOpened(!menuOpened)}
                />

                <nav className={menuOpened ? 'menuBar activeMenuBar' : 'menuBar'}>
                    <NavLink to='/cash'>
                        <i className='fa-solid fa-dollar-sign'></i>
                        <p>Cash</p>
                    </NavLink>

                    <NavLink to='/transfer'>
                        <i className='fa-solid fa-rotate'></i>
                        <p>Transfer</p>
                    </NavLink>

                    <NavLink to='/about'>
                        <i className='fa-solid fa-file-lines'></i>
                        <p>About</p>
                    </NavLink>

                    <NavLink to='#' onClick={() => setSettingsOpened(!settingsOpened)}>
                        <i className='fa-solid fa-gear'></i>
                        <p>Settings</p>
                    </NavLink>

                    <NavLink to='/support'>
                        <i className='fa-solid fa-envelope'></i>
                        <p>Support</p>
                    </NavLink>

                    <NavLink to='#' onClick={() => setModal(!modal)}>
                        <i className='fa-solid fa-right-from-bracket'></i>
                        <p>Sign Out</p>
                    </NavLink>
                </nav>

                <div ref={settRef} className={settingsOpened ? 'settingsBar activeMenuBar' : 'settingsBar'}>
                    <NavLink to='/edit/profile'>My Profile</NavLink>

                    <div className='switch'>
                        Dark mode
                        <input 
                          type='checkbox' 
                          className='settInput' 
                          checked={inputChecked} 
                          onChange={darkModeFunc} 
                        />
                    </div>

                    <div className='deleteAccount' onClick={deleteAccountFunction}>
                        <p>Delete my account</p>
                    </div>
                </div>



                <div className='user'>
                    <Link to='/'>
                        <div className='logo'>
                            <img src='/images/logo.png' alt='logo' />
                        </div>

                        <div className='userName'>
                            <p>{name}</p>

                            <div className='avatar'>
                                <i className={avatar}></i>
                            </div>
                        </div>
                    </Link>
                </div>


            </header>
        </React.Fragment>
    )
}
