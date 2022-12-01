import React from 'react'
import { useQuery } from 'react-query'
import { $api } from '../../api/api'
import AddCardPopup from '../Popups/AddCardPopup/AddCardPopup'
import ImagePopup from '../Popups/ImagePopup/ImagePopup'
import SingleCard from './SingleCard'

const Cards = ({
	handleOnCardClick,
	closeAllPopups,
	selectedCard,
	isPopupOpened,
	isAddCardPopupOpened,
}) => {
	const { data, refetch, isSuccess } = useQuery(
		['get cards'],
		() =>
			$api({
				url: `/cards`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)
	return (
		<>
			<section className="elements">
				<ul className="elements__list">
					{isSuccess &&
						data.map((card, idx) => {
							return (
								<SingleCard
									name={card.name}
									url={card.url}
									key={idx}
									onCardClick={() => handleOnCardClick(card)}
									refetch={refetch}
									item={card._id}
								/>
							)
						})}
				</ul>
			</section>
			<ImagePopup
				isVisible={isPopupOpened}
				card={selectedCard}
				onClick={closeAllPopups}
			/>
			<AddCardPopup closeAllPopups={closeAllPopups} isVisible={isAddCardPopupOpened} onClick={closeAllPopups} refetch={refetch}/>
		</>
	)
}

export default Cards
