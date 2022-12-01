import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { $api } from '../../api/api'
import EditUserPhotoPopup from '../Popups/EditUserPhotoPopup/EditUserPhotoPopup'
import EditUserPopup from '../Popups/EditUserPopup/EditUserPopup'

const Profile = ({
	onEditAvatar,
	onEditProfile,
	onAddPlace,
	isEditPhotoPopupOpened,
	closeAllPopups,
	isEditProfilePopupOpened,
}) => {
	const { data, refetch, isSuccess } = useQuery(
		['Get Profile info'],
		() =>
			$api({
				url: '/users/profile',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	return (
		<>
			<section className="profile">
                {isSuccess && 
                <>
				<button
					onClick={onEditAvatar}
					type="button"
					className="profile__avatar-container"
				>
					<img alt="Аватар" className="profile__avatar" src={data.avatar} />
				</button>
				<div className="profile__info">
					<h1 className="profile__name">{data.name}</h1>
					<p className="profile__description">{data.description}</p>
					<button
						onClick={onEditProfile}
						type="button"
						className="profile__edit-button"
					/>
				</div>
				<button
					onClick={onAddPlace}
					type="button"
					className="profile__add-button"
				/>
                </>
            }
			</section>
			<EditUserPhotoPopup
				isVisible={isEditPhotoPopupOpened}
				onClick={closeAllPopups}
				refetch={refetch}
                closeAllPopups={closeAllPopups}
			/>
			<EditUserPopup
				isVisible={isEditProfilePopupOpened}
				onClick={closeAllPopups}
                closeAllPopups={closeAllPopups}
				refetch={refetch}
			/>
		</>
	)
}

export default Profile
