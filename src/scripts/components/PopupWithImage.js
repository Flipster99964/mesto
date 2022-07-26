import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.imagePopup__image');
    this._popupText = this._popupSelector.querySelector('.imagePopup__text');
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupText.textContent = name;
    this._popupImage.alt = name;
    super.open();
  }
}