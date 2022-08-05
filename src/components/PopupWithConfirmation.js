import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
  }

  // принимает коллбэк на удаление карточки
  submitCallback(removing) {
    this._handleSubmit = removing;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleSubmit();
    })
  }
}