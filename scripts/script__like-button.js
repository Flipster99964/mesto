let likeButton = document.querySelector('.element__like-button');
likeButton.addEventListener('click', function () {
    likeButton.classList.add('element__like-button_active');
    likeButton.classList.remove('element__like-button');
    console.log(likeButton);
}); 



