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
  initialCards.reverse();
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
const imagePopup = document.querySelector('.imagePopup');
const imagePopupImage = document.querySelector('.imagePopup__image');
const imageCloseButton = document.querySelector('.imagePopup__close-button')
const cardTemplate = document.querySelector('#element').content; 
const cards = document.querySelector('.elements');
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
const cardElement1 = cardTemplate.querySelector('.element').cloneNode(true);
const cardElement2 = cardTemplate.querySelector('.element').cloneNode(true);
const cardElement3 = cardTemplate.querySelector('.element').cloneNode(true);
const cardElement4 = cardTemplate.querySelector('.element').cloneNode(true);
const cardElement5 = cardTemplate.querySelector('.element').cloneNode(true);
cardElement.querySelector('.element__image').src = initialCards[0].link;
cardElement.querySelector('.element__text').textContent = initialCards[0].name;
cardElement1.querySelector('.element__image').src = initialCards[1].link;
cardElement1.querySelector('.element__text').textContent = initialCards[1].name;
cardElement2.querySelector('.element__image').src = initialCards[2].link;
cardElement2.querySelector('.element__text').textContent = initialCards[2].name;
cardElement3.querySelector('.element__image').src = initialCards[3].link;
cardElement3.querySelector('.element__text').textContent = initialCards[3].name;
cardElement4.querySelector('.element__image').src = initialCards[4].link;
cardElement4.querySelector('.element__text').textContent = initialCards[4].name;
cardElement5.querySelector('.element__image').src = initialCards[5].link;
cardElement5.querySelector('.element__text').textContent = initialCards[5].name;
cards.prepend(cardElement); 
cards.prepend(cardElement1); 
cards.prepend(cardElement2); 
cards.prepend(cardElement3); 
cards.prepend(cardElement4); 
cards.prepend(cardElement5); 


const image = document.querySelectorAll('.element__image');    //popup с картинкой
const imageArr = Array.from(image);
function popupImage() {                               
imageArr.forEach(function(elem) {
  elem.addEventListener('click', function() {
    imagePopup.classList.add("imagePopup_opened");
    imagePopupImage.src = elem.getAttribute('src');
});
});
}
popupImage();
function popupImageNew() {                                       
  const imageNew = document.querySelectorAll('#element-image');
  const imageNewArr = Array.from(imageNew);
  const imageArrAll = imageArr.concat(imageNewArr.slice(0, 1));
  imageArrAll.forEach(function(elem) {
    elem.addEventListener('click', function() {
      imagePopup.classList.add("imagePopup_opened");
      imagePopupImage.src = elem.getAttribute('src');
  });
  });
  }
function imageClosed() {
      imagePopup.classList.remove("imagePopup_opened");
    } 
    imageCloseButton.addEventListener('click', imageClosed); 
function popupOpened() {                                   //popup
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


function addedFormOpened() {                      //добавление карточки
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
  const cardElementNew = cardTemplate.querySelector('.element').cloneNode(true);
  cardElementNew.querySelector('.element__image').src = initialCards[0].link;
  cardElementNew.querySelector('.element__text').textContent = initialCards[0].name;
  cardElementNew.querySelector('.element__like-button').id = 'like-button';
  cardElementNew.querySelector('.element__image').id = 'element-image';
  cards.prepend(cardElementNew);
  addedFormClosed();
};
addedFormElement.addEventListener('submit', addedFormSubmitHandler);
addedFormElement.addEventListener('submit', AddLikeCard);
addedFormElement.addEventListener('submit', AddLike);
addedFormElement.addEventListener('submit', AddDelete);
addedFormElement.addEventListener('submit', AddDeleteCard);
addedFormElement.addEventListener('submit', popupImageNew);
const likeButton = cardsContainer.querySelectorAll('.element__like-button');
const likeButtonArr = Array.from(likeButton);
const deleteButton = cardsContainer.querySelectorAll('.element__delete-button');
const deleteButtonArr = Array.from(deleteButton);


function AddLikeCard() {                                                        //лайки
  const likeButtonNew = document.querySelectorAll('#like-button');
  const likeButtonNewArr = Array.from(likeButtonNew);
  const likeButtonArrAll = likeButtonArr.concat(likeButtonNewArr.slice(0, 1));
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


function AddDeleteCard() {                                                        //удаление карточки 
  const deleteButtonNew = document.querySelectorAll('#delete-button');  
  const deleteButtonNewArr = Array.from(deleteButtonNew);
  const deleteButtonArrAll = deleteButtonArr.concat(deleteButtonNewArr.slice(0, 1));
  deleteButtonArrAll.forEach(function(elem) {
    elem.addEventListener('click', function() { 
      elem.parentNode.remove();
    });
    });
    };
function AddDelete() {
deleteButtonArr.forEach(function(elem) {
  elem.addEventListener('click', function() {
    elem.parentNode.remove();
  });
  });
};
AddDelete();

