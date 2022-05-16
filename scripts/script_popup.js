let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
profileEditButton.addEventListener('click', function () {
    popup.className = 'popup_opened';
}); 
closeButton.addEventListener('click', function () {
    popup.className = 'popup';
}); 
