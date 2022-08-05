const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__job");
const profileForm = document.querySelector(".popup__container");
const addedForm = document.querySelector(".popup_added-form");
const addedFormButton = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__avatar-btn");
const formEditAvatar = document.querySelector(".avatarPopup");
const avatar = document.querySelector('.profile__avatar');
export const imagePopup = document.querySelector(".imagePopup");
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import "../pages/index.css";

// создание карточки
const viewImagePopup = new PopupWithImage(".imagePopup");
viewImagePopup.setEventListeners();

// функционал создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardTemplate: '#element',
    userId: userId,
    handleCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  const cardElement = card.createCardElement();
  return cardElement;
};

// Создание экземпляра класса Section
const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements');

// Создаем попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.deletePopup'
});
deleteCardPopup.setEventListeners();

// форма добавления карточки
const addCardPopup = new PopupWithForm({
  popupSelector: ".popup_added-form",
  handleFormSubmit: (data) => {
    addCardPopup.loading(true);
    api.addCard(data)
      .then((data) => {
        cardsList.addItem(createCard(data));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addCardPopup.loading(false);
      });
  },
});
// слушатели для формы добавления карточки
addCardPopup.setEventListeners();

addedFormButton.addEventListener("click", () => {
  addCardPopup.open();
});

const formEditProfileValidator = new FormValidator(settings, profileForm);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(settings, addedForm);
formAddNewCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(settings, formEditAvatar);
formEditAvatarValidator.enableValidation();

// API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: 'fca34032-ff7c-4199-a459-318687c2ade6',
    'Content-Type': 'application/json'
  }
});

let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });



const userInfo = new UserInfo({
  username: ".profile__name",
  job: '.profile__description',
  avatar: '.profile__avatar'
});

// создание попапа с формой редактирования профиля
function fillEditProfileForm({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

const editProfilePopup = new PopupWithForm({
  popupSelector: ".popup_profile",
  handleFormSubmit: (dataForm) => {
    editProfilePopup.loading(true);
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfilePopup.loading(false);
      });
  },
});
editProfilePopup.setEventListeners();



// Создание попапа редактирования аватара пользователя
const editAvatarPopup = new PopupWithForm({
  popupSelector: '.avatarPopup',
  handleFormSubmit: (data) => {
    avatar.src = data.link;
    editAvatarPopup.close();
  }
});
editAvatarPopup.setEventListeners();
// Обработчик кнопки Edit аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarValidator.toggleButtonState();
  editAvatarPopup.open();
});

// Обработчик кнопки Edit попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  fillEditProfileForm({
    username: info.username,
    job: info.job,
  });
  editProfilePopup.open();
});
