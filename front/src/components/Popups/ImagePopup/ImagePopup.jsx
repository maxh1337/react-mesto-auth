import React from 'react';

const ImagePopup = ({card, isVisible, onClick}) => {


    return (
        <section className={isVisible ? "popup popup_type_image popup_opened" : "popup popup_type_image"}
                 onClick={onClick}>
            <figure className="popup__figure" onClick={e => e.stopPropagation()}>
                <button type="button"
                        className='popup__close-button popup__close-button_parent-corners_straight'/>
                <img className="popup__image" alt={card.name} src={card.url}/>
                <figcaption className="popup__caption">{card.name}</figcaption>
            </figure>
        </section>
    );
};

export default ImagePopup;