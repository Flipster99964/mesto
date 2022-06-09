const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const closeButton = document.querySelector('.popup__close-button');
const addedFormcloseButton = document.querySelector('#addedForm__close-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job');
const jobInputNew = document.querySelector('.profile__description');
const nameInputNew = document.querySelector('.profile__name');
const formElement = document.querySelector('.popup__container');
const addedFormElement = document.querySelector('#addedForm__container');
const cardName = document.querySelector('.element__text');
const addedForm = document.querySelector('.popup_added-form');
const addButton = document.querySelector('.profile__add-button');
const addName = document.querySelector('.popup__add-name');
const addLink = document.querySelector('.popup__add-link');
const cardsContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup_imagePopup');
const imagePopupImage = document.querySelector('.popup__image_imagePopup');
const imageCloseButton = document.querySelector('.popup__close-button_imagePopup');
const imagePopupText = document.querySelector('.popup__text_imagePopup');
const cardTemplate = document.querySelector('#element').content; 
const cards = document.querySelector('.elements');
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);


function AddCards() {                                                               //добавление первых шести карточек
  for (let i = 0; i < 6; i++) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = initialCards[i].link;
    cardElement.querySelector('.element__text').textContent = initialCards[i].name;
    cardElement.querySelector('.element__image').alt = initialCards[i].name;
    cards.append(cardElement);
  }


  function AddLike() {                                                              //слушатель лайка
    const likeButton = cardsContainer.querySelectorAll('.element__like-button');
    const likeButtonArr = Array.from(likeButton);
  likeButtonArr.forEach(function(elem) {
    elem.addEventListener('click', function() {
      elem.classList.toggle("element__like-button_active");
    });
    });
  };


  const image = document.querySelectorAll('.element__image');                        //popup с картинкой
  const imageArr = Array.from(image);
  function popupImage() {                               
  imageArr.forEach(function(elem) {
  elem.addEventListener('click', function() {
    openModalWindow(imagePopup);
    imagePopupImage.src = elem.getAttribute('src');
    imagePopupImage.alt = elem.getAttribute('alt');
    imagePopupText.textContent = elem.closest('div').lastElementChild.firstElementChild.textContent;
  });
  });
  }


  function AddDelete() {                                                                //удаление карточки 
    const deleteButton = cardsContainer.querySelectorAll('.element__delete-button');
  const deleteButtonArr = Array.from(deleteButton);
  deleteButtonArr.forEach(function(elem) {
    elem.addEventListener('click', function() {
      elem.parentNode.remove();
   });
   });
};
popupImage()
AddLike();
AddDelete();
}
AddCards();
imageCloseButton.addEventListener('click', ()=> (closeModalWindow(imagePopup))); 
                            

function openModalWindow(elem) {                                                     //popup
  elem.classList.add("popup_opened");
} 
function inputValue() {
  nameInput.value = nameInputNew.textContent;
  jobInput.value = jobInputNew.textContent;
}
profileEditButton.addEventListener('click', ()=> (openModalWindow(popupProfile)));
profileEditButton.addEventListener('click', inputValue);
function closeModalWindow(elem) {
    elem.classList.remove("popup_opened");
} 
closeButton.addEventListener('click', ()=> (closeModalWindow(popupProfile))); 
function formSubmitHandler (evt) {
    evt.preventDefault();
    jobInputNew.textContent = jobInput.value;
    nameInputNew.textContent = nameInput.value;
    popupClosed();
}
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', ()=> (closeModalWindow(popupProfile)));


function renderCard(elem) {                                                                //добавление карточки
  cards.prepend(elem);
}
addButton.addEventListener('click', ()=> (openModalWindow(addedForm)));              
addedFormcloseButton.addEventListener('click', ()=> (closeModalWindow(addedForm))); 
const likeButton = cardsContainer.querySelectorAll('.element__like-button');
function addedFormSubmitHandler (evt) {
  evt.preventDefault();
  const cardElementNew = cardTemplate.querySelector('.element').cloneNode(true);
  cardElementNew.querySelector('.element__image').src = addLink.value;
  cardElementNew.querySelector('.element__text').textContent = addName.value;


  function AddLikeCard() {                                                                //слушатель лайка на новой карточке 
    const likeButtonNew = cardsContainer.querySelector('.element__like-button');
    likeButtonNew .addEventListener('click', function() {
      likeButtonNew.classList.toggle("element__like-button_active");
    });
  };


  function popupImageNew() {                                                              //popup с картинкой для новой карточки 
    const imageNew = document.querySelector('.element__image');
    imageNew.addEventListener('click', function() {
        imagePopup.classList.add("popup_opened");
        imagePopupImage.src = imageNew.getAttribute('src');
        imagePopupText.textContent = imageNew.closest('div').lastElementChild.firstElementChild.textContent;
    });
    }


    function AddDeleteCard() {                                                            //удаление новой карточки 
      const deleteButtonNew = document.querySelector('.element__delete-button');  
        deleteButtonNew.addEventListener('click', function() { 
          deleteButtonNew.parentNode.remove();
        });
        };
  renderCard(cardElementNew);
  closeModalWindow(addedForm);
  AddLikeCard();
  popupImageNew();
  AddDeleteCard();
};
addedFormElement.addEventListener('submit', addedFormSubmitHandler);






    