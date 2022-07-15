import {openModalWindow} from "./index.js";
import {imagePopup} from "./index.js";
const imagePopupImage = document.querySelector(".imagePopup__image");
const imagePopupText = document.querySelector(".imagePopup__text");
export class Card{
    constructor(name, link, cardTemplate) {
      this._name = name;
      this._link = link;
      this._cardTemplate = cardTemplate;
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
      this._element.remove();
  }
    // метод слушателя открытия попапа просмотра изображения
  _handleOpenPopup() {
    imagePopupImage.src = this._link;
    imagePopupImage.alt = this._name;
    imagePopupText.textContent = this._name;
    openModalWindow(imagePopup);
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
    this._element.querySelector('.element__image').addEventListener('click', () => {
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
  
  