import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.imagePopup__image');
    this._popupText = this._popup.querySelector('.imagePopup__text');
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupText.textContent = name;
    this._popupImage.alt = name;
    super.open();
  }
}