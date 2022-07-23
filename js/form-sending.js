import { sendData } from './api.js';
import { form } from './form-validate.js';
import { closeForm, onUploadCancelEscKeydown } from './form.js';
import { submitButton } from './form-validate.js';
import { closeByEscKeydown } from './util.js';

// Отправка формы с фотографией
function sendUserFormSubmit(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitButton.disabled = true;

    sendData(
      () => {
        onSuccess();
        submitButton.disabled = false;
        openSuccessMessage();
      },
      () => {
        submitButton.disabled = false;
        openErrorMessage();
      },
      new FormData(evt.target),
    );
  });
}

// Обработка успешной отправки формы
const successTemplate = document.querySelector('#success').content;
const cloneSuccessFragment = successTemplate.cloneNode(true);
const cloneSuccess = cloneSuccessFragment.querySelector('.success');
const successButton = cloneSuccess.querySelector('.success__button');

// Функция закрытия окна с сообщением об успешной отправке по клавише 'Escape'
function onSuccessMessageEscKeydown (evt) {
  closeByEscKeydown(closeSuccessMessage, evt);
}

// Функция закрытия окна с сообщением об успешной отправке по событию
function onSuccesMessageCancel (evt) {
  if (evt.target === cloneSuccess) {
    closeSuccessMessage();
  }
}

// Функция открытия окна с сообщением об успешной отправке
function openSuccessMessage() {
  document.body.appendChild(cloneSuccess);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('click', onSuccesMessageCancel);
}

// Функция закрытия окна с сообщением об успешной отправке
function closeSuccessMessage() {
  document.body.removeChild(cloneSuccess);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onSuccesMessageCancel);
}

// Обработка ошибки отправки формы
const errorTemplate = document.querySelector('#error').content;
const cloneErrorFragment = errorTemplate.cloneNode(true);
const cloneError = cloneErrorFragment.querySelector('.error');
const errorButton = cloneError.querySelector('.error__button');

// Функция закрытия окна с сообщением об ошибке отправки по клавише 'Escape'
function onErrorMessageEscKeydown (evt) {
  closeByEscKeydown(closeErrorMessage, evt);
}

// Функция закрытия окна с сообщением об ошибке отправки по событию
function onErrorMessageCancel (evt) {
  if (evt.target === cloneError) {
    closeErrorMessage();
  }
}

// Функция открытия окна с сообщением об ошибке отправки
function openErrorMessage() {
  document.body.appendChild(cloneError);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  errorButton.addEventListener('click', closeErrorMessage);
  cloneError.style.zIndex = '100';
  document.addEventListener('click', onErrorMessageCancel);
  document.removeEventListener('keydown', onUploadCancelEscKeydown);
}

// Функция закрытия окна с сообщением об ошибке отправки
function closeErrorMessage() {
  document.body.removeChild(cloneError);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', onErrorMessageCancel);
  document.addEventListener('keydown', onUploadCancelEscKeydown);
}

sendUserFormSubmit(closeForm);

export { sendUserFormSubmit };
