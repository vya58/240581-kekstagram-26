import { sendData } from './api.js';
import { form } from './form-validate.js';
import { closeForm, onKeydown } from './form.js';
import { submitButton } from './form-validate.js';
import { removeSpaces } from './util.js';

// Отправка формы с фотографией
function sendUserFormSubmit(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitButton.disabled = true;

    // Удаляем лишние введённыепробелы из поля хэш-тегов перед отправкой
    const hashtagsInput = document.querySelector('.text__hashtags');
    hashtagsInput.value = removeSpaces(hashtagsInput.value);

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
const successRoot = successTemplate.cloneNode(true);
const successSection = successRoot.querySelector('.success');
const successButton = successRoot.querySelector('.success__button');

// Функция закрытия окна с сообщением об успешной отправке по клавише 'Escape'
function onSuccessKeydown (evt) {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
}

// Функция закрытия окна с сообщением об успешной отправке по событию
function onDocumentClick (evt) {
  if (evt.target === successSection) {
    closeSuccessMessage();
  }
}

// Функция открытия окна с сообщением об успешной отправке
function openSuccessMessage() {
  document.body.appendChild(successSection);
  document.addEventListener('keydown', onSuccessKeydown);
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('click', onDocumentClick);
}

// Функция закрытия окна с сообщением об успешной отправке
function closeSuccessMessage() {
  document.body.removeChild(successSection);
  document.removeEventListener('keydown', onSuccessKeydown);
  document.removeEventListener('click', onDocumentClick);
}

// Обработка ошибки отправки формы
const errorTemplate = document.querySelector('#error').content;
const errorRoot = errorTemplate.cloneNode(true);
const errorSection = errorRoot.querySelector('.error');
const errorButton = errorSection.querySelector('.error__button');

// Функция закрытия окна с сообщением об ошибке отправки по клавише 'Escape'
function onErrorKeydown (evt) {
  if (evt.key === 'Escape') {
    closeErrorMessage();
  }
}

// Функция закрытия окна с сообщением об ошибке отправки по событию
function onErrorClick (evt) {
  if (evt.target === errorSection) {
    closeErrorMessage();
  }
}

// Функция открытия окна с сообщением об ошибке отправки
function openErrorMessage() {
  document.body.appendChild(errorSection);
  document.addEventListener('keydown', onErrorKeydown);
  errorButton.addEventListener('click', closeErrorMessage);
  errorSection.style.zIndex = '100';
  document.addEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onKeydown);
}

// Функция закрытия окна с сообщением об ошибке отправки
function closeErrorMessage() {
  document.body.removeChild(errorSection);
  document.removeEventListener('keydown', onErrorKeydown);
  document.removeEventListener('click', onErrorClick);
  document.addEventListener('keydown', onKeydown);
}

sendUserFormSubmit(closeForm);
