import React from 'react'; 
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {CurrentCardsContext}  from '../contexts/CurrentCardsContext'

function Main(props) {

   // Подписываемся на контекст CurrentUserContext
   const userData = React.useContext(CurrentUserContext);
   // Подписываемся на контекст CurrentCardsContext
   const cardsData = React.useContext(CurrentCardsContext);

  function CardList(props) {
    const cards = props.cards;

    const listCards = cards.map((card) => (
      <Card card={card} onCardClick={props.onCardClick} key={card._id}
      onCardLike={props.onCardLike} setCards={props.setCards}
      onCardDelete={props.onCardDelete}/>
      ));
      return(
        <ul className="elements__list">
          {listCards}
        </ul>
      );
  }
    return(
        <main className="content">
        <section className="profile">
          <div onClick={props.onEditAvatar} className="profile__avatar-container">
            <img src={userData.avatar} alt={userData.name} className="profile__avatar"/>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userData.name}</h1>
            <p className="profile__description">{userData.about}</p>
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button" />
          </div>
          <button onClick={props.onAddPlace} type="button" className="profile__add-button"/>
        </section>
          <CardList cards={cardsData} onCardClick={props.onCardClick} onCardLike={props.onCardLike} setCards={props.setCards} onCardDelete={props.onCardDelete}/>
      </main>
    )
}
export default Main;