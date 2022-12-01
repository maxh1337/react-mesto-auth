import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { $api } from '../../../api/api'

const AddCardPopup = ({ isVisible, onClick, closeAllPopups, refetch }) => {
	const [name, setName] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
        addCard()
	}

	const { mutate: addCard } = useMutation(
		'addCard',
		() =>
			$api({
				url: '/cards',
				type: 'POST',
				body: { name, url },
				auth: true,
			}),
		{
			onSuccess() {
                refetch()
                closeAllPopups()
			},
		}
	)

	return (
		<section
			className={isVisible ? 'popup popup_opened' : 'popup'}
			onClick={() => {
				onClick()
				setName('')
				setUrl('')
			}}
		>
			<div className="popup__container" onClick={e => e.stopPropagation()}>
				<button
					title="close-button"
					type="reset"
					className="popup__close-button popup__close-button_parent-corners_straight"
				/>
				<h2 className="popup__title">Добавить карточку</h2>
				<form onSubmit={handleSubmit} className="form">
					<input
						className="form__input"
						placeholder="Название"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<input
						className="form__input"
						placeholder="Ссылка на картинку"
						value={url}
						onChange={e => setUrl(e.target.value)}
					/>
					<button
						title="Добавить"
						type="submit"
						className="popup__button form__button"
					>
						Добавить
					</button>
				</form>
			</div>
		</section>
	)
}

export default AddCardPopup
