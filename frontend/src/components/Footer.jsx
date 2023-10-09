import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import '../scss/Footer.scss';

export function Footer() {
    const [modal, setModal] = useState(false);
    const { logout } = useContext(AuthContext);

    return (
        <React.Fragment>
            <div className={modal ? 'modal activeModal' : 'modal'}>
                <div className='modalBackground' onClick={() => setModal(false)}></div>

                <div className='modalBody'>
                    <p>Are you sure you want to log out of your account?</p>

                    <div className='buttonsModal'>
                        <button onClick={logout} className='modal_btn_yes'>Yes</button>
                        <button className='modal_btn_cancel' onClick={() => setModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            <footer>
                <nav className='bottomNav'>
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

                    <NavLink to='#' onClick={() => setModal(!modal)}>
                        <i className='fa-solid fa-right-from-bracket'></i>
                        <p>Sign Out</p>
                    </NavLink>
                </nav>
            </footer>
        </React.Fragment>
    )
}