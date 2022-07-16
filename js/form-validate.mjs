import { checkStringLength, getCountSymbol } from './util.mjs';

const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('#upload-submit');

const pristine = new Pristine(form);

// Валидация поля ввода хэш-тегов
const textHashTags = document.querySelector('.text__hashtags');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// Функция проверки корректности введённых данных
function validateHashTagCharacter(value) {
  const array = value.split(' ');
  let result = false;

  for (const element of array) {
    // Проверка количества символов # в отдельном хэш-теге
    const symbol = '#';
    const countHashTags = getCountSymbol(element, symbol);

    // Отказ в валидации, если символ # в отдельном хэш-теге не один или хэш-тег состоит только из этого символа
    if (countHashTags > 1 || element.length === 1) {
      return false;
    }

    // Проверка поля ввода на пустоту и на допустимые символы согласно регулярному выражению
    if (element === '' || re.test(element)) {
      result = true;
    }
  }

  return result;
}

// Функция проверки на максимальную длину хэш-тега
function validateHashTagLength(value) {
  const maxLength = 20;
  const array = value.split(' ');

  for (const element of array) {
    if (!checkStringLength(element, maxLength)) {
      return false;
    }
  } return true;
}

// Функция проверки на максимальное количество хэш-тегов
function validateHashTagsCount(value) {
  const array = value.split(' ');
  const maxHasTagsCount = 5;
  return checkStringLength(array, maxHasTagsCount);
}

// Функция проверки хэш-тегов на дубликаты с учетом регистра
function validateHashTagsDuplicate(value) {
  const array = value.split(' ');
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j] || array[i].toLowerCase() === array[j].toLowerCase()) {
        return false;
      }
    }
  } return true;
}

// Проверка поля ввода хэш-тегов пользовательскими функциями валидации
pristine.addValidator(textHashTags, validateHashTagLength, false);
pristine.addValidator(textHashTags, validateHashTagsCount, false);
pristine.addValidator(textHashTags, validateHashTagCharacter, false);
pristine.addValidator(textHashTags, validateHashTagsDuplicate, false);

// Функция-обработчик формы при вводе значений в поле
form.addEventListener('input', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'disabled');
  }
});
