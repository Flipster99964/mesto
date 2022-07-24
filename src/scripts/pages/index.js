const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const profileCloseBtn = document.querySelector(".popup__close-button");
const addedFormcloseButton = document.querySelector("#addedForm__close-button");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__job");
const jobInputNew = document.querySelector(".profile__description");
const nameInputNew = document.querySelector(".profile__name");
const profileForm = document.querySelector(".popup__container");
const addedFormElement = document.querySelector("#addedForm__container");
const addedForm = document.querySelector(".popup_added-form");
const addButton = document.querySelector(".profile__add-button");
const addName = document.querySelector(".popup__add-name");
const addLink = document.querySelector(".popup__add-link");
const cardsContainer = document.querySelector(".elements");
const imageCloseButton = document.querySelector(".imagePopup__close-button");
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
import Section from "../components/Section.js";

// создание карточки 
function createCard(name, link) {
  const card = new Card(name, link, "#element");
  const cardElement = card.createCardElement();
  return cardElement
}

function closeOpenedPopup() {                                //открытие и закрытие popup
  const openedPopup = document.querySelector('.popup_opened')
  closeModalWindow(openedPopup);
}
function closeByEscape(evt) {     
  if (evt.key === 'Escape') {
    closeOpenedPopup()
  }
}
function openModalWindow(elem) {
  document.addEventListener("keydown", closeByEscape)
  elem.querySelector(".popup__bg").addEventListener("click", closeOpenedPopup)
  elem.classList.add("popup_opened");
}
function closeModalWindow(elem) {
  document.removeEventListener("keydown", closeByEscape);
  elem.querySelector(".popup__bg").removeEventListener("click", closeOpenedPopup);
  elem.classList.remove("popup_opened");
}


function fillProfileInputs() {
  nameInput.value = nameInputNew.textContent;
  jobInput.value = jobInputNew.textContent;
}
function handleOpenProfileClick() {
  openModalWindow(popupProfile);
  fillProfileInputs();
}
profileEditButton.addEventListener("click", handleOpenProfileClick);
profileCloseBtn.addEventListener("click", () => closeModalWindow(popupProfile));
imageCloseButton.addEventListener("click", () => closeModalWindow(imagePopup));


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  jobInputNew.textContent = jobInput.value;
  nameInputNew.textContent = nameInput.value;
  closeModalWindow(popupProfile);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", () => openModalWindow(addedForm)); //форма добавления карточки
addedFormcloseButton.addEventListener("click", () =>
  closeModalWindow(addedForm)
);
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard(addName.value, addLink.value);
  cardsContainer.prepend(cardElement);
  closeModalWindow(addedForm);
  addedFormElement.reset();
  formAddNewCardValidator.toggleButtonState();
}
addedFormElement.addEventListener("submit", handleCardFormSubmit);



const formEditProfileValidator = new FormValidator(settings, profileForm);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(settings, addedForm);
formAddNewCardValidator.enableValidation();
export {openModalWindow, closeModalWindow};

// отрисовка карточек из массива
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '#element', openModalWindow, closeModalWindow);
    const cardElement = card.createCardElement();

    cardsList.addItem(cardElement);
  },
}, cardsContainer);

// загрузка карточек на страницу
cardsList.renderItems();



    