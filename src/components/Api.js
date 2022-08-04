class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    // Получение карточек
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  

      // Получение информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._parseResponse(res));
  }

    // Редактирование информации о пользователе
    editUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.username,
          about: data.job
        })
      })
        .then(res => this._parseResponse(res));
    }
  }
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
    headers: {
      authorization: 'fca34032-ff7c-4199-a459-318687c2ade6',
      'Content-Type': 'application/json'
    }
  }); 
  