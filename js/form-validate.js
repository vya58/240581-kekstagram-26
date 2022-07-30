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
const hashtagsInput = document.querySelector('.text__hashtags');
const re = /^[A-Za-zА-Яа-яЁё0-9#]+$/;

// Проверка, что перым символом является '#'
function validateHashtagSharpFirst(value) {
  const array = value.split(/\s+/);
  const symbol = '#';

  for (const element of array) {
    if (!(element === '' || element[0] === symbol)) {
      return false;
    }
  }
  return true;
}

// Проверка, что хэш-тег состоит только из одного символа '#'
function validateHashtagSharpOnly(value) {
  const array = value.split(/\s+/);
  const symbol = '#';

  for (const element of array) {
    const hashtagsСount = getCountSymbol(element, symbol);

    if (hashtagsСount === 1 && element.length === 1) {
      return false;
    }
  }
  return true;
}

// Функция проверки количества символов # в отдельном хэш-теге
function validateHashtagSharpCount(value) {
  const array = value.split(/\s+/);
  const symbol = '#';

  for (const element of array) {
    const hashtagsСount = getCountSymbol(element, symbol);

    if (hashtagsСount > 1 && element.length > 1) {
      return false;
    }
  }
  return true;
}

// Функция проверки корректности введённых символов
function validateHashtagCharacter(value) {
  const array = value.split(/\s+/);

  for (const element of array) {
    if (!(element === '' || re.test(element))) {
      return false;
    }
  }
  return true;
}

// Функция проверки на максимальную длину хэш-тега
function validateHashtagLength(value) {
  const array = value.split(/\s+/);

  for (const element of array) {
    if (element.length > MAX_HASHTAG_LENGTH) {
      return false;
    }
  }
  return true;
}

// Функция проверки на максимальное количество хэш-тегов
function validateHashtagsCount(value) {
  const array = value.split(/\s+/);

  if (array.length > MAX_HASHTAG_COUNT) {
    return false;
  }
  return true;
}

// Функция проверки хэш-тегов на дубликаты с учетом регистра
function validateHashtagsDuplicate(value) {
  const hashtagsString = value.toLowerCase();
  const array = hashtagsString.split(/\s+/);

  if (new Set(array).size !== array.length) {
    return false;
  }
  return true;
}

// Проверка поля ввода хэш-тегов функциями валидации
pristine.addValidator(hashtagsInput, validateHashtagSharpFirst, 'Хэш-тег должен начинается с символа (#)!');
pristine.addValidator(hashtagsInput, validateHashtagSharpOnly, 'Хеш-тег не может состоять только из одного символа #!');
pristine.addValidator(hashtagsInput, validateHashtagSharpCount, 'Символ хэш-тега (#) должен быть только один!');
pristine.addValidator(hashtagsInput, validateHashtagCharacter, 'Строка после решётки должна состоять только из букв и чисел и не может содержать пробелы, спецсимволы (@, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д!', false);
pristine.addValidator(hashtagsInput, validateHashtagLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку!');
pristine.addValidator(hashtagsInput, validateHashtagsCount, 'Нельзя указать больше пяти хэш-тегов!');
pristine.addValidator(hashtagsInput, validateHashtagsDuplicate, 'Один и тот же хэш-тег не может быть использован дважды! Хэш-теги нечувствительны к регистру!');

// Функция-обработчик формы при вводе значений в поле
form.addEventListener('input', (evt) => {
  evt.preventDefault();

  submitButton.disabled = !pristine.validate();
});

export { form, submitButton };
