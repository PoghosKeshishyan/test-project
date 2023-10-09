import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../scss/ProfileEditPage.scss';
import axios from '../axios';

export function ProfileEditPage() {
    const { avatar, name, userId: id } = useContext(AuthContext);
    const [userName, setUserName] = useState(name);
    const [logoAvatar, setLogoAvatar] = useState(avatar);
    const sumbmitIcons = (e) => setLogoAvatar(e.target.className);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        await axios.put(`api/auth/edit/profile/${id}`, { userName, logoAvatar }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            const data = JSON.parse(localStorage.getItem('myOwnBank_isLogin'));

            if(data) {
                data.avatar = logoAvatar;
                data.name = userName;
                localStorage.setItem('myOwnBank_isLogin', JSON.stringify(data));
                window.location.reload();
            }
        })
    }

    return (
        <>
            <i className="fa-solid fa-house" onClick={() => navigate('/')} />

            <form className='ProfileEditPage' onSubmit={submitHandler} data-aos='zoom-in'>
                <p className="title">Change your name</p>
                <input 
                  type="text" 
                  className='name' 
                  value={userName} 
                  onChange={e => setUserName(e.target.value)} 
                />

                <div className="profileAvatar">
                    <p className='title'>Change your user logo</p>

                    <div className='avatar'>
                        <i className={logoAvatar}></i>
                    </div>
                </div>

                <div className="icons">
                    <i className="fa-solid fa-circle-user" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-coins" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-vault" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-piggy-bank" onClick={sumbmitIcons}></i>
                    <i className="fa-brands fa-react" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-snowman" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-bomb" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-plane" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-globe" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-user-astronaut" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-font-awesome" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-lemon" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-carrot" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-apple-whole" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-tree" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-truck" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-van-shuttle" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-tractor" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-cloud" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-heart" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-guitar" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-fish" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-cow" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-cat" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-hippo" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-kiwi-bird" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-spaghetti-monster-flying" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-mosquito" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-frog" onClick={sumbmitIcons}></i>
                    <i className="fa-solid fa-crow" onClick={sumbmitIcons}></i>
                    <i className="fa-brands fa-fort-awesome-alt" onClick={sumbmitIcons}></i>
                </div>

                <button className='btn'>Save</button>
            </form>
        </>
    )
}