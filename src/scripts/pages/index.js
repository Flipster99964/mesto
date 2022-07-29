const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__job");
const profileForm = document.querySelector(".popup__container");
const addedForm = document.querySelector(".popup_added-form");
const addButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".elements");
export const imagePopup = document.querySelector(".imagePopup");
const settings = {
formSelector: '.form',
inputSelector: '.form__input',
submitButtonSelector: '.popup__submit-button',
inactiveButtonClass: 'popup__submit-button_inactive',
inputErrorClass: 'form__input_type_error',
errorClass: 'form__input-error_active'
}
import {initialCards} from '../utils/cards.js';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from "../components/PopupWithImage.js";
import '../../pages/index.css'
// создание карточки 
function createCard(data) {
  const card = new Card({
    data, 
    handleCardClick: (name, link) => {
      const viewImagePopup = new PopupWithImage('.imagePopup');
      viewImagePopup.setEventListeners();
      viewImagePopup.open(name, link);
}}, "#element");
  const cardElement = card.createCardElement();
  return cardElement
}

// форма добавления карточки
const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_added-form',
  handleFormSubmit: (data) => {
    cardsList.addItem(createCard(data));
    addCardPopup.close();
  }
});
// слушатели для формы добавления карточки
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  addCardPopup.open();
})

const formEditProfileValidator = new FormValidator(settings, profileForm);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(settings, addedForm);
formAddNewCardValidator.enableValidation();

// отрисовка карточек из массива
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
}, cardsContainer);

// загрузка карточек на страницу
cardsList.renderItems();

const userInfo = new UserInfo({
  username: '.profile__name',
  job: '.profile__description'
});


// создание попапа с формой редактирования профиля
function fillEditProfileForm({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleFormSubmit: (dataForm) => {
    userInfo.setUserInfo(dataForm);
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();
// Обработчик кнопки Edit попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillEditProfileForm({
    username: info.username,
    job: info.job
  });
  editProfilePopup.open();
});

