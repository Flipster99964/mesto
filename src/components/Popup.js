export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._closeButton = this._popup.querySelector('.popup__close-button');
      this._popupBg = this._popup.querySelector('.popup__bg');
      this._escapeClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._escapeClose);
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._escapeClose);
    }
  
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    setEventListeners() {
      this._closeButton.addEventListener('click', () => {
        this.close();
      })
      this._popupBg.addEventListener('mousedown', () => {
          this.close();
      });
    }
  }