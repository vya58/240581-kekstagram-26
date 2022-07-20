import { checkStringLength, getCountSymbol } from './util.mjs';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('#upload-submit');

const pristine = new Pristine(form);

// Валидация поля ввода хэш-тегов
const textHashtags = document.querySelector('.text__hashtags');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// Функция проверки корректности введённых данных
function validateHashtagCharacter(value) {
  const array = value.split(' ');
  let result = false;

  for (let i = 0; i < array.length; i++) {
    // Проверка количества символов # в отдельном хэш-теге
    const symbol = '#';
    const countHashtags = getCountSymbol(array[i], symbol);

    // Отказ в валидации, если символ # в отдельном хэш-теге не один или хэш-тег состоит только из этого символа
    // Перед этим проверяется, что поле не пустое
    if (array[i] === '' && i === 0) {
      result = true;
    } else if (countHashtags !== 1 || array[i].length === 1) {
      return false;
    }

    // Проверка поля ввода на пустоту и на допустимые символы согласно регулярному выражению
    if (array[i] === '' || re.test(array[i])) {
      result = true;
    } else {
      return false;
    }
  }
  return result;
}

// Функция проверки на максимальную длину хэш-тега
function validateHashtagLength(value) {
  const array = value.split(' ');

  for (const element of array) {
    if (!checkStringLength(element, MAX_HASHTAG_LENGTH)) {
      return false;
    }
  } return true;
}

// Функция проверки на максимальное количество хэш-тегов
function validateHashtagsCount(value) {
  const array = value.split(' ');
  return checkStringLength(array, MAX_HASHTAG_COUNT);
}

// Функция проверки хэш-тегов на дубликаты с учетом регистра
function validateHashtagsDuplicate(value) {
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
pristine.addValidator(textHashtags, validateHashtagLength, false);
pristine.addValidator(textHashtags, validateHashtagsCount, false);
pristine.addValidator(textHashtags, validateHashtagCharacter, false);
pristine.addValidator(textHashtags, validateHashtagsDuplicate, false);

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
