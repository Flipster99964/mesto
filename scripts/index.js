const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const closeButton = document.querySelector(".popup__close-button");
const addedFormcloseButton = document.querySelector("#addedForm__close-button");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__job");
const jobInputNew = document.querySelector(".profile__description");
const nameInputNew = document.querySelector(".profile__name");
const formElement = document.querySelector(".popup__container");
const inputElement = formElement.querySelector('.popup__field-text')
const addedFormElement = document.querySelector("#addedForm__container");
const cardName = document.querySelector(".element__text");
const addedForm = document.querySelector(".popup_added-form");
const addButton = document.querySelector(".profile__add-button");
const addName = document.querySelector(".popup__add-name");
const addLink = document.querySelector(".popup__add-link");
const cardsContainer = document.querySelector(".elements");
const imagePopup = document.querySelector(".imagePopup");
const imagePopupImage = document.querySelector(".imagePopup__image");
const imageCloseButton = document.querySelector(".imagePopup__close-button");
const imagePopupText = document.querySelector(".imagePopup__text");
const cardTemplate = document.querySelector("#element").content;
const cards = document.querySelector(".elements");
const popupBg = document.querySelectorAll(".popup__bg");
const popupBgArray = Array.from(popupBg);




function renderCard(name, link) {
  //добавление карточки в разметку
  cards.prepend(createCard(name, link));
}

function createCard(name, link) {
  //создание карточки
  const cardElementNew = cardTemplate.querySelector(".element").cloneNode(true);
  cardElementNew.querySelector(".element__image").src = link;
  cardElementNew.querySelector(".element__text").textContent = name;
  cardElementNew.querySelector(".element__image").alt = name;

  const imageNew = cardElementNew.querySelector(".element__image"); //слушатель imagePopup
  imageNew.addEventListener("click", function () {
    openModalWindow(imagePopup);
    imagePopupImage.src = link;
    imagePopupText.textContent = name;
    imagePopupImage.alt = name;
  });
  imageCloseButton.addEventListener("click", () =>
    closeModalWindow(imagePopup)
  );
  const deleteButtonNew = cardElementNew.querySelector(
".element__delete-button"
  ); //слушатель иконки удаления
  deleteButtonNew.addEventListener("click", function () {
    deleteButtonNew.closest(".element").remove();
  });

  const likeButtonNew = cardElementNew.querySelector(".element__like-button"); //слушатель лайка
  likeButtonNew.addEventListener("click", function () {
    likeButtonNew.classList.toggle("element__like-button_active");
  });

  return cardElementNew;
}

function AddCards() {
  //добавление первых шести карточек
  for (let i = 0; i < 6; i++) {
    renderCard(initialCards[i].name, initialCards[i].link);
  }
}
AddCards();



function openModalWindow(elem) {
  //открытие и закрытие popup
  document.addEventListener("keydown", function(evt) {
    if (evt.key === "Escape") {
      closeModalWindow(elem);
  }
  })
  elem.classList.add("popup_opened");
}
function closeModalWindow(elem) {
  elem.classList.remove("popup_opened");
}


function inputValue() {
  nameInput.value = nameInputNew.textContent;
  jobInput.value = jobInputNew.textContent;
}
function handleOpenProfileClick() {
  openModalWindow(popupProfile);
  inputValue();
  enableValidation(); 
}
profileEditButton.addEventListener("click", handleOpenProfileClick);
closeButton.addEventListener("click", () => closeModalWindow(popupProfile));


function clickCloseModalWindow (container) {
popupBgArray.forEach (function(elem) {
elem.addEventListener("click", () => closeModalWindow(container)
)})
}
clickCloseModalWindow(popupProfile);
clickCloseModalWindow(addedForm);
clickCloseModalWindow(imagePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  jobInputNew.textContent = jobInput.value;
  nameInputNew.textContent = nameInput.value;
  closeModalWindow(popupProfile);
}
formElement.addEventListener("submit", formSubmitHandler);

addButton.addEventListener("click", () => openModalWindow(addedForm)); //добавление карточки
addedFormcloseButton.addEventListener("click", () =>
  closeModalWindow(addedForm)
);
function addedFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(addName.value, addLink.value);
  closeModalWindow(addedForm);
  addedFormElement.reset();
  enableValidation();
}
addedFormElement.addEventListener("submit", addedFormSubmitHandler);





    