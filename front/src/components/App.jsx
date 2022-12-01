import {Navigate, Route, Routes} from 'react-router-dom';
import React from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Main from "./Main/Main";
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

const App = () => {
    const { isAuth } = useAuth()

    const RequireAuth = ({children}) => {
        return isAuth ? children : <Navigate to='/login'/>
    }

    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={
                <RequireAuth>
                    <Main/>
                </RequireAuth>
                }/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
