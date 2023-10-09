import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

export function SwiperCards({cards}) {
    const navigate = useNavigate();

    return (
        <Swiper
            className="mySwiper"
            effect='cards'
            direction='vertical'
            loop={true}
            grabCursor={true}
            modules={[EffectCards]}
        >
            {
                cards.length > 0 && cards.map(el =>
                    <SwiperSlide
                        key={el._id}
                        style={{ background: el.card[0].bgColor }}
                        className='swiper-slide'
                        onClick={() => navigate(`/card/${el._id}`)}
                    >
                        <div className='heading'>
                            <p className='title'>{el.card[0].title}</p>
                            <img src='/images/logo_black.png' alt='logo' />
                        </div>

                        <div className='chip'>
                            <img src='/images/chip.jpg' alt='chip' />
                            <p className='balans'>Balans <span>${el.card[0].price.toLocaleString('en-US')}</span></p>
                        </div> 

                        <div className='code'>
                            <p className='chipCode'>{el.cardNumber}</p>
                            <img src='/images/nfc.png' className='nfcImg' alt='nfc' />
                        </div> 
                    </SwiperSlide>
                )
            }
        </Swiper>
    )
}
