import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ModalV2 } from '../components/ModalV2';
import '../scss/AuthPage.scss';
import axios from '../axios';

export function AuthPage() {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        name: '', email: '', password: '',
    })
    const [inputType, setInputType] = useState('password');
    const [checked, setChecked] = useState(false);

    // modal
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState('');
    
    const onChangeInput = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const handlerEye = (e) => {
        if (e.target.classList[1].includes('slash')) {
            e.target.classList.remove('fa-eye-slash');
            e.target.classList.add('fa-eye');
            setInputType('text');
        } else {
            e.target.classList.remove('fa-eye');
            e.target.classList.add('fa-eye-slash');
            setInputType('password');
        }
    }

    const sumbitHandler = async(e) => {
        e.preventDefault();

        try {
            await axios.post('api/auth/registration', newUser, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                setModal(true);
                setModalText(response.data.message)
            })
            .then(() => navigate('/'))
            .catch(err => {
                setModal(true);
                setModalText(err.response.data.message)
            })

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='AuthPage'>

            <ModalV2 modal={modal} setModal={setModal} modalText={modalText} />

            <div className='logo-auth'>
                <img src='/images/logo.png' alt='logo' />
            </div>

            <form onSubmit={sumbitHandler}>
                <p>Enter your name *</p>
                <input
                    required
                    type='text'
                    name='name'
                    className='userName'
                    onChange={onChangeInput}
                    value={newUser.name}
                />

                <p>Enter your email *</p>
                <input
                    type='email'
                    name='email'
                    className='userEmail'
                    onChange={onChangeInput}
                    value={newUser.email}
                />

                <p>Enter your password *</p>
                <p>(min 6 symbol)</p>
                <div className='pinBox'>
                    <input
                        required
                        name='password'
                        type={inputType}
                        value={newUser.password}
                        onChange={onChangeInput}
                    />
                    <i className='fa-regular fa-eye-slash' onClick={handlerEye}></i>
                </div>

                <div className='policy'>
                    <input type='checkbox' onChange={e => setChecked(e.target.checked)} required />

                    <div>
                        <p>I agree with Privacy Policy</p>
                        <p><Link to='#'>Read</Link> our Terms and Privacy Policy</p>
                    </div>
                </div>

                <input 
                  type='submit' 
                  value='Create' 
                  className={checked ? ' btn btnActive' : 'btn btnVisible'} 
                />
            </form>

            <Link className='haveAccount' to='/login'>You already have account ?</Link>
        </div>
    )
}