import { 
  baseUrl,
  baseToken } from "../utils/constants";

// класс для работы с сервером
 class API {

  constructor(url,token) {
    this._url = url;
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
  // метод инициализации карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

    // метод инициализации данных пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

    // сохранение на сервере отредактированных данных пользователя
  setUserData({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, about})
    }).then(this._checkResponse)
  }

    // добавление на сервере новой карточки
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkResponse) 
  }

  // метод удаления карточек
  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

  // ставим лайк карточке
  changeLikeCardStatus(idCard,like){
    return fetch(`${this._url}/cards/likes/${idCard}`, {
      method: like ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

  // метод получения данных карточки
  getCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

  // метод для обновления аватара пользователя
  patchAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkResponse)
  }
}

// экземпляр класса для работы с сервером
// API для получение данных
export const apiData = new API(baseUrl,baseToken);
