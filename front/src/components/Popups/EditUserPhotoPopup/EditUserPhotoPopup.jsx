import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { $api } from '../../../api/api'

const EditUserPhotoPopup = ({ isVisible, onClick, refetch, closeAllPopups }) => {
	const [url, setUrl] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
        editAvatar()
	}

	const { mutate: editAvatar } = useMutation(
		'Edit profile avatar',
		() =>
			$api({
				url: '/users/profile',
				type: 'PUT',
				body: { url },
				auth: true,
			}),
		{
            onSuccess(){
                refetch()
                closeAllPopups()
            }
        }
	)

	return (
		<section
			className={isVisible ? 'popup popup_opened' : 'popup'}
			onClick={() => {
				onClick()
				setUrl('')
			}}
		>
			<div className="popup__container" onClick={e => e.stopPropagation()}>
				<button
					title="close-button"
					type="reset"
					className="popup__close-button popup__close-button_parent-corners_straight"
				/>
				<h2 className="popup__title">Обновить аватар</h2>
				<form onSubmit={handleSubmit} className="form">
					<input
						className="form__input"
						placeholder="Ссылка на картинку"
						value={url}
						onChange={e => setUrl(e.target.value)}
					/>
					<button
						title="Обновить"
						type="submit"
						className="popup__button form__button"
					>
						Обновить
					</button>
				</form>
			</div>
		</section>
	)
}

export default EditUserPhotoPopup
