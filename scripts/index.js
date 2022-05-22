const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
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
const formElement = document.querySelector('.popup__container');
console.dir(formElement);
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job');
const jobInputNew = document.querySelector('.profile__description');
const nameInputNew = document.querySelector('.profile__name');
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    jobInputNew.textContent = jobInput.value;
    nameInputNew.textContent = nameInput.value;
    popupClosed();
}
formElement.addEventListener('submit', formSubmitHandler);