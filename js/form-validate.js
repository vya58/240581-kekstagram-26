import { getCountSymbol } from './util.js';
import { MAX_HASHTAG_LENGTH, MAX_HASHTAG_COUNT } from './data.js';

const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('#upload-submit');

const pristine = new Pristine(
  form,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
  }
);

// Валидация поля ввода хэш-тегов
const textHashtags = document.querySelector('.text__hashtags');
const reSharp = /^#/;
const re = /[A-Za-zА-Яа-яЁё0-9#]{1,19}$/;

// Функция проверки, что хэш-тег начинается с символа '#'
function validateHashtagBeginWithSharp(value) {
  const array = value.split(' ');

  for (let i = 0; i < array.length; i++) {
    if (!reSharp.test(array[i]) && value) {
      return false;
    }
  }
  return true;
}

// Проверка, что хэш-тег состоит только из одного символа '#'
function validateHashtagSharpOnly(value) {
  const array = value.split(' ');
  const symbol = '#';

  for (let i = 0; i < array.length; i++) {
    const countHashtags = getCountSymbol(array[i], symbol);

    if (countHashtags === 1 && array[i].length === 1) {
      return false;
    }
  }
  return true;
}

// Функция проверки количества символов # в отдельном хэш-теге
function validateHashtagSharpCount(value) {
  const array = value.split(' ');
  const symbol = '#';

  for (let i = 0; i < array.length; i++) {
    const countHashtags = getCountSymbol(array[i], symbol);

    if (countHashtags > 1 && array[i].length > 1) {
      return false;
    }
  }
  return true;
}

// Функция проверки корректности введённых данных
function validateHashtagCharacter(value) {
  const array = value.split(' ');

  for (let i = 0; i < array.length; i++) {
    if (!(array[i] === '' || re.test(array[i]))) {
      return false;
    }
  }
  return true;
}

// Функция проверки на максимальную длину хэш-тега
function validateHashtagLength(value) {
  const array = value.split(' ');
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > MAX_HASHTAG_LENGTH) {
      return false;
    }
  }
  return true;
}

// Функция проверки на максимальное количество хэш-тегов
function validateHashtagsCount(value) {
  const array = value.split(' ');
  for (let i = 0; i < array.length; i++) {
    if (array.length > MAX_HASHTAG_COUNT) {
      return false;
    }
  }
  return true;
}

// Функция проверки хэш-тегов на дубликаты с учетом регистра
function validateHashtagsDuplicate(value) {
  const array = value.split(' ');
  for (let i = 0; i < array.length; i++) {

    if (array[i].length > 1) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] === array[j] || array[i].toLowerCase() === array[j].toLowerCase()) {
          return false;
        }
      }
    }
  } return true;
}

// Проверка поля ввода хэш-тегов функциями валидации
pristine.addValidator(textHashtags, validateHashtagBeginWithSharp, 'Хэш-тег должен начинается с символа (#)!', false);
pristine.addValidator(textHashtags, validateHashtagSharpOnly, 'Хеш-тег не может состоять только из одного символа #!', false);
pristine.addValidator(textHashtags, validateHashtagSharpCount, 'Символ хэш-тега (#) должен быть только один!', false);
pristine.addValidator(textHashtags, validateHashtagCharacter, 'Строка после решётки должна состоять только из букв и чисел и не может содержать пробелы, спецсимволы (@, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д!', false);
pristine.addValidator(textHashtags, validateHashtagLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку!', false);
pristine.addValidator(textHashtags, validateHashtagsCount, 'Нельзя указать больше пяти хэш-тегов!', false);
pristine.addValidator(textHashtags, validateHashtagsDuplicate, 'Один и тот же хэш-тег не может быть использован дважды! Хэш-теги нечувствительны к регистру!', false);

// Функция-обработчик формы при вводе значений в поле
form.addEventListener('input', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

export { form, submitButton };
