import React from 'react';
import '../index.css'
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import  {apiData}  from '../utils/Api';
import { CurrentCardsContext }  from '../contexts/CurrentCardsContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'


function App() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCards, setCurrentCards] = React.useState([]);
  
  function handleCardClick(card){
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null)
  };
  function handleUpdateUser(user) {
    apiData.setUserData(user)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
      return [];
    })
  };

  function handleUpdateAvatar(avatar) {
    apiData.patchAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
      return [];
    })
  };
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiData.changeLikeCardStatus(card._id, isLiked, setCurrentCards)
    .then((newCard) => {
      setCurrentCards((cardsData) => cardsData.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
    
  } 
  function handleCardDelete(deletedCard) {
    // Отправляем запрос в API
    apiData.deleteCard(deletedCard._id)
    .then(() => {
      setCurrentCards((cardsData) => cardsData.filter((c) => {return c._id !== deletedCard._id }));
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  } 
  function handleAddPlaceSubmit(newCard) {
    apiData.postCard(newCard)
    .then((res) => {
      // Создадаем экземпляр карточки
      setCurrentCards([res, ...currentCards]); 
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  } 
  React.useEffect(() => {
    // запрос в API за пользовательскими данными
    Promise.all([ 
    apiData.getUserData(),
    apiData.getInitialCards()
    ])
    .then((res) => {
      setCurrentUser(res[0]);
      setCurrentCards(res[1])
    })
    .catch((err) => {
      console.log(err);
      return [];
    })
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <CurrentCardsContext.Provider value={currentCards}>
        <Main onEditProfile={handleEditProfileClick} onCardClick={handleCardClick} 
            onAddPlace={handleAddPlaceClick} setCards={setCurrentCards}  onCardDelete={handleCardDelete}
            onEditAvatar={handleEditAvatarClick} onCardLike={handleCardLike}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
      </CurrentCardsContext.Provider>

    <Footer />
    <PopupWithForm name='delete-confirmation' title='Вы уверены?' buttonName='Да' onClosePopup={closeAllPopups}/>
    <ImagePopup card={selectedCard} onClosePopup={closeAllPopups}/>
</CurrentUserContext.Provider>
  )};
export default App;
