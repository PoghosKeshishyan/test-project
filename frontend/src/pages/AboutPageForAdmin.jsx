import { useNavigate } from 'react-router-dom';
import { RWebShare } from "react-web-share";
import '../scss/AboutPageForAdmin.scss';

export function AboutPageForAdmin() {
    const navigate = useNavigate();

    return (
        <>
            <i className='fa-solid fa-circle-left' onClick={() => navigate('/')} />

            <div className='AboutPageForAdmin' data-aos='zoom-in'>
                <p className='aboutText'>Hello my young friend. I want to inform you that with the help of this wonderful application you will learn how to properly handle your money. You can always find out how much money you have, how much you have spent, how much is left to save to achieve your goal.</p>

                {/* ======= on share application ======= */}
                <div className='shareApp'>
                    <p>You can share this app with your friends.</p>

                    <RWebShare
                        data={{
                            title: "My Own Bank",
                            text: "My Own Bank",
                            url: "https://myownbank.pro",
                        }}
                    >
                        <button className='shareBtn'>
                            <i className="fa-solid fa-share-nodes"></i>
                            <p>Share</p>
                        </button>
                    </RWebShare>
                </div>
            </div>
        </>
    )
}