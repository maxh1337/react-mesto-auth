import React from 'react';
import { useMutation } from 'react-query';
import { $api } from '../../api/api';

const SingleCard = ({name, url, onCardClick, refetch, item}) => {

    

    const { mutate: cardDelete } = useMutation(
		'Delete card',
		item =>
			$api({
				url: `/cards/${item}`,
				type: 'DELETE',
			}),
		{
			onSuccess(data) {
				console.log('Успешно удалено')
				refetch()
			},
		}
	)


    const handleDeleteCard = (e) => {
        e.preventDefault()
        let cardId = item
        cardDelete(cardId)
    }

    return (
        <li className='element'>
            <img
                className="element__image"
                alt={name}
                src={url}
                onClick={onCardClick}
            />
            <div className="element__container">
                <h2 className="element__title">{name}</h2>
                <button onClick={handleDeleteCard} type="reset" className="element__trash-button"/>
            </div>
        </li>
    );
};

export default SingleCard;