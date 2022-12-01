import React, {useState} from 'react';
import {AuthContext} from "../contexts/AuthContext";
import App from "../components/App";

const AuthProvider = () => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <App />
        </AuthContext.Provider>
    );
};

export default AuthProvider;