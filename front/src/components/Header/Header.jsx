import React from 'react';
import logo from "../../images/logo2.svg";
import {useAuth} from "../../hooks/useAuth";

const Header = () => {
    const {isAuth, setIsAuth} = useAuth()


    const handleLogout = () => {
        setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <header className="header">
            <a target="_self" href="" className="logo header__logo">
                <img className="logo__img" style={{width: '40px', height: '40px'}} alt="Mesto" src={logo}/>
            </a>
            <div className="header__container">
                <button className="header__credential" onClick={handleLogout}>Выйти</button>
            </div>
        </header>
    );
};

export default Header;
