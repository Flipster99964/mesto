export class Card{
    constructor({data, handleCardClick}, cardTemplate) {
      this._name = data.name;
      this._link = data.link;
      this._cardTemplate = cardTemplate;
      this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
      return cardElement;
    }

    // метод слушателя лайка
  _handleLikeCard() {
    this._likeBtn.classList.toggle('element__like-button_active');
  }
    // метод слушателя кнопки удалить
  _handleDeleteCard() {
    this._element = null;
  }
    // метод слушателя открытия попапа просмотра изображения
  _handleOpenPopup() {
    this._handleCardClick(this._name, this._link);
  }
    // Установка слушателей
  _setEventListeners() {
    this._imageNew = this._element.querySelector(".element__image");
    this._likeBtn = this._element.querySelector('.element__like-button');
      // слушатель кнопки лайк
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeCard();
    })
      // слушатель кнопки удаления карточки
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    })
      // открытие попапа с картинкой
    this._imageNew.addEventListener('click', () => {
      this._handleOpenPopup();
    })
      }
    // Создание карточки
    createCardElement() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._imageNew.alt = `${this._name}`;
      this._imageNew.src = this._link;
      this._element.querySelector(".element__text").textContent = this._name;
      return this._element;
    }
}
  
  