const initialCards = [
    {
      name: 'Шиганшина',
      link: 'https://static.wikia.nocookie.net/shingekinokyojin/images/2/2e/Shiganshina_in_anime.png/revision/latest/scale-to-width-down/160?cb=20210109204402&path-prefix=ru'
    },
    {
      name: 'Стохес',
      link: 'https://static.wikia.nocookie.net/shingekinokyojin/images/f/f6/Stohess_anime.png/revision/latest/scale-to-width-down/160?cb=20211021122218&path-prefix=ru'
    },
    {
      name: 'Замок Утгард',
      link: 'https://static.wikia.nocookie.net/shingekinokyojin/images/5/5e/Замок_Утгард.jpg/revision/latest/scale-to-width-down/160?cb=20170416072732&path-prefix=ru'
    },
    {
      name: 'Лес гигантских деревьев',
      link: 'https://static.wikia.nocookie.net/shingekinokyojin/images/c/c9/The_Forest_of_the_Giant_Trees.png/revision/latest/scale-to-width-down/160?cb=20210429062123&path-prefix=ru'
    },
    {
      name: 'Даупер',
      link: 'https://static.wikia.nocookie.net/shingekinokyojin/images/8/84/Даупер.png/revision/latest/scale-to-width-down/160?cb=20170414042104&path-prefix=ru'
    },
    {
      name: 'Трост',
      link: 'https://static.wikia.nocookie.net/shingekinokyojin/images/b/b7/Трост_аниме.png/revision/latest/scale-to-width-down/160?cb=20170824230315&path-prefix=ru'
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
function popupOpened() {
    popup.classList.add("popup_opened")
    nameInput.value = nameInputNew.textContent;
    jobInput.value = jobInputNew.textContent;
} 
profileEditButton.addEventListener('click', popupOpened); 
function popupClosed() {
    popup.classList.remove("popup_opened")
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

  addedFormClosed();
}
addedFormElement.addEventListener('submit', addedFormSubmitHandler);