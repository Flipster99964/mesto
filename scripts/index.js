const initialCards = [
    {
      name: 'Шиганшина',
      link: 'images/Shiganshina_in_anime.png'
    },
    {
      name: 'Стохес',
      link: 'images/Stohess_anime.png'
    },
    {
      name: 'Замок Утгард',
      link: 'images/castle.jpg'
    },
    {
      name: 'Лес гигантских деревьев',
      link: 'images/The_Forest_of_the_Giant_Trees.png'
    },
    {
      name: 'Даупер',
      link: 'images/dowper.png'
    },
    {
      name: 'Трост',
      link: 'images/trost.png'
    }
  ]; 
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const addedFormcloseButton = document.querySelector('.addedForm__close-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job');
const jobInputNew = document.querySelector('.profile__description');
const nameInputNew = document.querySelector('.profile__name');
const formElement = document.querySelector('.popup__container');
const addedFormElement = document.querySelector('.addedForm__container');
const cardLink = document.querySelector('.element__image');
const cardName = document.querySelector('.element__text');
const addedForm = document.querySelector('.addedForm');
const addButton = document.querySelector('.profile__add-button');
const addName = document.querySelector('.add__name');
const addLink = document.querySelector('.add__link');
const cardsContainer = document.querySelector('.elements');

function addCard() {
  cardsContainer.insertAdjacentHTML('afterbegin', `
<div class="element">
  <button class="element__delete-button"></button>
  <img src="${initialCards[0].link}" class="element__image" alt="изображение места">
  <div class="element__block">
      <h2 class="element__text">${initialCards[0].name}</h2>
      <button type="button" class="element__like-button"></button>
  </div>
</div>
<div class="element">
  <button class="element__delete-button"></button>
  <img src="${initialCards[1].link}" class="element__image" alt="изображение места">
  <div class="element__block">
      <h2 class="element__text">${initialCards[1].name}</h2>
      <button type="button" class="element__like-button"></button>
  </div>
</div>
<div class="element">
  <button class="element__delete-button"></button>
  <img src="${initialCards[2].link}" class="element__image" alt="изображение места">
  <div class="element__block">
      <h2 class="element__text">${initialCards[2].name}</h2>
      <button type="button" class="element__like-button"></button>
  </div>
</div>
<div class="element">
  <button class="element__delete-button"></button>
  <img src="${initialCards[3].link}" class="element__image" alt="изображение места">
  <div class="element__block">
      <h2 class="element__text">${initialCards[3].name}</h2>
      <button type="button" class="element__like-button"></button>
  </div>
</div>
<div class="element">
  <button class="element__delete-button"></button>
  <img src="${initialCards[4].link}" class="element__image" alt="изображение места">
  <div class="element__block">
      <h2 class="element__text">${initialCards[4].name}</h2>
      <button type="button" class="element__like-button"></button>
  </div>
</div>
<div class="element">
  <button class="element__delete-button"></button>
  <img src="${initialCards[5].link}" class="element__image" alt="изображение места">
  <div class="element__block">
      <h2 class="element__text">${initialCards[5].name}</h2>
      <button type="button" class="element__like-button"></button>
  </div>
</div>
  `);
}
addCard();

function popupOpened() {
    popup.classList.add("popup_opened");
    nameInput.value = nameInputNew.textContent;
    jobInput.value = jobInputNew.textContent;
} 
profileEditButton.addEventListener('click', popupOpened); 
function popupClosed() {
    popup.classList.remove("popup_opened");
} 
closeButton.addEventListener('click', popupClosed); 
function formSubmitHandler (evt) {
    evt.preventDefault();
    jobInputNew.textContent = jobInput.value;
    nameInputNew.textContent = nameInput.value;
    popupClosed();
}
formElement.addEventListener('submit', formSubmitHandler);
function addedFormOpened() {
    addedForm.classList.add("popup_opened");
    addName.placeholder = 'Название';
    addLink.placeholder = 'Ссылка на картинку';
} 
addButton.addEventListener('click', addedFormOpened); 
function addedFormClosed() {
    addedForm.classList.remove("popup_opened");
} 
addedFormcloseButton.addEventListener('click', addedFormClosed); 
function addedFormSubmitHandler (evt) {
  evt.preventDefault();
  initialCards.unshift(    {
    name: addName.value,
    link: addLink.value
  })
  cardsContainer.insertAdjacentHTML('afterbegin', `
<div class="element">
  <button class="element__delete-button"></button>
  <img src="${initialCards[0].link}" class="element__image" alt="изображение места">
  <div class="element__block">
      <h2 class="element__text">${initialCards[0].name}</h2>
      <button type="button" id="like-button" class="element__like-button element__like-buttonNew"></button>
  </div>
</div>
`);
  addedFormClosed();
};
addedFormElement.addEventListener('submit', addedFormSubmitHandler);
addedFormElement.addEventListener('submit', AddLikeCard);
addedFormElement.addEventListener('submit', AddLike);
const likeButton = cardsContainer.querySelectorAll('.element__like-button');
const likeButtonArr = Array.from(likeButton);
const deleteButton = cardsContainer.querySelectorAll('.element__delete-button');
const deleteButtonArr = Array.from(deleteButton);
function AddLikeCard() {
  const likeButtonNew = document.querySelectorAll('#like-button');
  const likeButtonNewArr = Array.from(likeButtonNew);
  const likeButtonArrAll = likeButtonArr.concat(likeButtonNewArr.slice(0, 1));
  console.log(likeButtonArrAll);
  console.log(likeButtonArr);
  likeButtonArrAll.forEach(function(elem) {
    elem.addEventListener('click', function() {
      if (elem.classList.contains("element__like-button_active")) {
        elem.classList.remove("element__like-button_active");
      }
      else {
      elem.classList.add("element__like-button_active");
      }
    });
    });
};
function AddLike() {
likeButtonArr.forEach(function(elem) {
  elem.addEventListener('click', function() {
    if (elem.classList.contains("element__like-button_active")) {
      elem.classList.remove("element__like-button_active");
    }
    else {
    elem.classList.add("element__like-button_active");
    }
  });
  });
};
AddLike();

