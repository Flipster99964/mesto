const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }; 
  
  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  
  const toggleButtonState = (inputList, buttonElement, settings) => {
    // Если есть хотя бы один невалидный инпут
    const { inactiveButtonClass } = settings;
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'true');
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'true');
    }
  }; 
  
  const showInputError = (formElement, inputElement, errorMessage, settings ) => {
    // Находим элемент ошибки внутри самой функции
    const { inputErrorClass } = settings;
    const { errorClass } = settings;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const { inputErrorClass } = settings;
    const { errorClass } = settings;

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }; 
  
  
  // Функция isValid теперь принимает formElement и inputElement,
  // а не берёт их из внешней области видимости
  
  const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement, settings);
    }
  }; 
  
  const setEventListeners = (formElement, settings) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const { inputSelector } = settings;
    const { submitButtonSelector } = settings;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, settings);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, settings)
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }; 
  
  const enableValidation = (settings) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const { formSelector } = settings;
    const formList = Array.from(document.querySelectorAll(formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, settings);
    });
  };
  
  // Вызовем функцию
  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }); 