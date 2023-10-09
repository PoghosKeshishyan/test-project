import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../scss/ForgotPinCodePage.scss';
import axios from '../axios';

export function ForgotPinCode() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post('api/auth/forgot/password', { email }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(() => {
        navigate('/login')
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='ForgotPinCode' data-aos='zoom-in'>
      <i className='fa-solid fa-circle-left' onClick={() => navigate(-1)} style={{ top: '20px' }} />

      <form onSubmit={submitHandler}>
        <p>Forgot your pin code? <br /> Enter your email.</p>
        <span>We will try to respond to your letter.</span>

        <input
          required
          type='email'
          name='email'
          value={email}
          placeholder='example@gmail.com'
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type='submit'
          value='Send'
          className={email.includes('@') ? ' btn btnActive' : ' btn btnVisible'}
        />
      </form>
    </div>
  )
}