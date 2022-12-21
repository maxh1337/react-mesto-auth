import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { $api } from '../../api/api'
import { useAuth } from '../../hooks/useAuth'

const Register = () => {
    const {setIsAuth} = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
        register()
		setEmail('')
		setPassword('')
	}

    const successAuth = (token) => {
        localStorage.setItem('token', token)
        setIsAuth(true)

        setEmail('')
        setPassword('')
        
        navigate('/')
        
    }

	const { mutate: register } = useMutation('Register', () => $api({
        url: '/users/register',
        type: 'POST',
        body: {email, password},
    }),
    {
        onSuccess(data){
            successAuth(data.token)
        }
    }
    )

	return (
		<div className="content auth">
			<h2 className="auth__title">Sign Up</h2>

			<form onSubmit={handleSubmit} className="form">
				<input
					autoFocus
					type="email"
					autoComplete="current-email"
					placeholder="Email"
					className="form__input form__input_theme_dark"
					value={email}
					onChange={e => setEmail(e.currentTarget.value)}
				/>
				<input
					type="password"
					autoComplete="current-password"
					placeholder="Пароль"
					className="form__input form__input_theme_dark"
					value={password}
					onChange={e => setPassword(e.currentTarget.value)}
				/>
				<button type="submit" className="form__button form__button_theme_dark">
					Login
				</button>
			</form>
			<div className="auth__signin">
				Уже зарегистрированы?{' '}
				<Link to="/login" className="auth__login-link">
					Войти
				</Link>
			</div>
		</div>
	)
}

export default Register
