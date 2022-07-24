export default class Popup {
    constructor(popupSelector) {
      this._popup = popupSelector;
      this._closeButton = this._popup.querySelector('.popup__close-button');
      this._popupBg = this._popup.querySelector('.popup__bg');
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      this._handleEscClose();
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      this._handleEscClose();
    }
  
    _handleEscClose(event) {
      event.preventDefault();
      if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        this.close(openedPopup);
      }
    }
  
    setEventListeners() {
      this._closeButton.addEventListener('click', () => {
        this.close();
      })
      this._popupBg.addEventListener('click', () => {
        this.close();
      })
    }
  }