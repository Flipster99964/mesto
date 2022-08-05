import {
  profileEditButton, nameInput, jobInput, profileName,
  profileDescription, profileForm, addedForm,
  addedFormButton, buttonEditAvatar, formEditAvatar, avatar,
  settings
} from '../utils/constants.js';

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

const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements');

// Попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.deletePopup'
});
deleteCardPopup.setEventListeners();

// Форма добавления карточки
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
// Слушатели для формы добавления карточки
addCardPopup.setEventListeners();

addedFormButton.addEventListener("click", () => {
  formAddNewCardValidator.toggleButtonState();
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

// Попапа с формой редактирования профиля
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
        profileName.textContent = dataForm.name;
        profileDescription.textContent = dataForm.about;
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        console.log(dataForm)
      })
      .finally(() => {
        editProfilePopup.loading(false);
      });
  },
});
editProfilePopup.setEventListeners();


// Попапа редактирования аватара пользователя
const editAvatarPopup = new PopupWithForm({
  popupSelector: '.avatarPopup',
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
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
