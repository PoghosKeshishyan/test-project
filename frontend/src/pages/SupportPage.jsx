import { useNavigate } from 'react-router-dom';
import '../scss/SupportPage.scss';

export function SupportPage() {
  const navigate = useNavigate();

  return (
    <>
      <i className="fa-solid fa-house" onClick={() => navigate('/')} />

      <div className="SupportPage" data-aos='zoom-in'>
        <p>Contact us if you have <br /> any questions</p>

        <a href='mailto:myownbank.2023@gmail.com'>
          <i className="fa-solid fa-envelope"></i>
          myownbank.2023@gmail.com
        </a>
      </div>
    </>
  )
}