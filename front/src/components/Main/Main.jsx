import React, { useState } from 'react'
import Profile from '../Profile/Profile'
import Cards from '../Cards/Cards'

const Main = () => {
	const [isPopupOpened, setIsPopupOpened] = useState(false)
	const [isEditPhotoPopupOpened, setIsEditPhotoPopupOpened] = useState(false)
	const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false)
	const [isAddCardPopupOpened, setIsAddCardPopupOpened] = useState(false)
	const [selectedCard, setSelectedCard] = useState({})

	const closeAllPopups = () => {
		setIsPopupOpened(false)
		setIsEditPhotoPopupOpened(false)
		setIsEditProfilePopupOpened(false)
		setIsAddCardPopupOpened(false)
	}

	const handleOnCardClick = card => {
		setSelectedCard(card)
		setIsPopupOpened(true)
	}

	return (
		<>
			<main className="content">
				<Profile
					avatar="https://mobimg.b-cdn.net/v3/fetch/a5/a572284e28c5218a3ee631c937be827c.jpeg"
					name="Даниил"
					about="Drug addict"
					onEditAvatar={() => setIsEditPhotoPopupOpened(true)}
					onEditProfile={() => setIsEditProfilePopupOpened(true)}
					onAddPlace={() => setIsAddCardPopupOpened(true)}
                    closeAllPopups={closeAllPopups}
                    isEditPhotoPopupOpened={isEditPhotoPopupOpened}
					isEditProfilePopupOpened={isEditProfilePopupOpened}
				/>
				<Cards
					handleOnCardClick={handleOnCardClick}
					closeAllPopups={closeAllPopups}
					isPopupOpened={isPopupOpened}
                    isAddCardPopupOpened={isAddCardPopupOpened}
                    selectedCard={selectedCard}
				/>
			</main>
		</>
	)
}

export default Main
