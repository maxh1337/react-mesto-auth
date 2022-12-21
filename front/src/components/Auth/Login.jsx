import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from "react-router-dom";
import { $api } from '../../api/api';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isAuth, setIsAuth } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        login()
    }

    const successAuth = (token) => {
        localStorage.setItem('token', token)
        setIsAuth(true)

        setEmail('')
        setPassword('')

        navigate('/')

    }

    const { mutate: login } = useMutation('Login', () => $api({
          url: '/users/login',
          type: 'POST',
          body: { email, password },
          auth: false,
      }),
      {
          onSuccess(data) {
              successAuth(data.token)
          }
      }
    )

    return (
      <div className="content auth">
          <h2 className="auth__title">Sign In</h2>

          <form onSubmit={handleSubmit} className='form'>
              <input
                autoFocus
                type='email'
                autoComplete='current-email'
                placeholder="Email"
                className='form__input form__input_theme_dark'
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <input
                type='password'
                autoComplete='current-password'
                placeholder="Пароль"
                className='form__input form__input_theme_dark'
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <button
                type="submit"
                className='form__button form__button_theme_dark'

              >
                  Login
              </button>
          </form>
          <div className="auth__signin">
              Еще не зарегистрированы?{' '}
              <Link to='/register' className="auth__login-link">Зарегистрироваться</Link>
          </div>
      </div>
    );
};

export default Login;