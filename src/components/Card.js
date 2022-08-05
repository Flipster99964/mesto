export class Card{
  constructor({ data, cardTemplate, userId, handleCardClick, handleDeleteIconClick, handleSetLike, handleRemoveLike }) {
      this._name = data.name;
      this._link = data.link;
      this._cardTemplate = cardTemplate;
      this._userId = userId;
      this._cardId = data._id;
      this._cardOwnerId = data.owner._id;
      this._handleCardClick = handleCardClick;
      this._handleDeleteIconClick = handleDeleteIconClick;
      this._likes = data.likes;
      this._handleSetLike = handleSetLike;
      this._handleRemoveLike = handleRemoveLike;
    }
    _getTemplate() {
      this._card = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
      return this._card;
    }

      // Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

    // Установка слушателей
  _setEventListeners() {
      // слушатель кнопки лайк
      this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('element__like-button_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    })
      // слушатель кнопки удаления карточки
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
    })
    //})
      // открытие попапа с картинкой
    this._imageNew.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
      }
    // Создание карточки
    createCardElement() {
      this._element = this._getTemplate();
      this._imageNew = this._element.querySelector(".element__image");
      this._likeBtn = this._element.querySelector('.element__like-button');
      this._likesNumber = this._element.querySelector('.element__likes-number');
      this._deleteBtn = this._element.querySelector('.element__delete-button');
      this._element.querySelector(".element__text").textContent = this._name;
      this._imageNew.alt = this._name;
      this._imageNew.src = this._link;
      this._hasDeleteBtn();
      this._isCardLiked();
      this._likesNumber.textContent = this._likes.length;
      this._setEventListeners();
      return this._element;
    }

  // изменение количества лайков
    handleLikeCard(data) {
      this._likes = data.likes;
      this._likesNumber.textContent = this._likes.length;
      this._likeBtn.classList.toggle('element__like-button_active');
    }


      // Проверить стоит ли лайк на карточке
  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeBtn.classList.add('element__like-button_active');
    }
  }


  // проверить владельца карточки и убирать кнопку Delete
  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
  }
}
  
  