class FormValidator {
  constructor(settings, formEl) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    }
  }

  _toggleButtonState(buttonElement) {
    const isFormValid = this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );
    buttonElement.disabled = !isFormValid;

    if (!isFormValid) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(buttonElement); // Initialize button state

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement); // Update button state
      });
    });
  }

  resetValidation() {
    // Clear all input errors and reset styles
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
      const errorElement = this._formEl.querySelector(
        `#${inputElement.id}-error`
      );
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
      inputElement.value = ""; // Optional: Reset input values if desired
    });

    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(buttonElement); // Reset button state
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent default form submission behavior
    });
    this._setEventListeners();
  }
}

export default FormValidator;
