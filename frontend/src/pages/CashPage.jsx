import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CashInput } from '../components/CashInput'
import { CashOut } from '../components/CashOut'
import '../scss/CashPage.scss';

export function CashPage() {
  const [inputClick, setInputClick] = useState(false);
  const [outClick, setOutClick] = useState(false);
  const navigate = useNavigate();

  const changeInput = () => {
    setInputClick(!inputClick);
    if (outClick) setOutClick(false);
  }

  const changeOut = () => {
    setOutClick(!outClick);
    if (inputClick) setInputClick(false);
  }

  return (
    <div>
      <i className='fa-solid fa-house' onClick={() => navigate('/')} />

      <div className='CashPage'>
        <div className={inputClick ? 'cashInput cashActive' : 'cashInput'} onClick={changeInput}>
          <i className='fa-sharp fa-solid fa-piggy-bank'></i>
          <p>Cash Input</p>
        </div>

        <div className={outClick ? 'cashOut cashActive' : 'cashOut'} onClick={changeOut}>
          <i className='fa-sharp fa-solid fa-piggy-bank rotate'></i>
          <p>Cash Out</p>
        </div>
      </div>

      {inputClick && <CashInput />}
      {outClick && <CashOut />}
    </div>
  )
}

export default CashPage;