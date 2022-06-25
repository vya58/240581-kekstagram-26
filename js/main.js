/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
* Функция взята из интернета и доработана https://htmlacademy.ru/
* Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
* Диапазон может быть только положительный, включая ноль.
* Дробные значения округляются:
* - нижняя граница диапазона - к ближайшему большему целому с помощью Math.ceil;
* - верхняя граница - к ближайшему меньшему целому с помощью Math.floor.
* Реализована поддержка передачи минимального и максимального значения в любом порядке.
* Переданные отрицательные берутся по модулю с помощью Math.ceil.
* @param {number} a - Число, задающее начало диапазона
* @param {number} b - Число, задающее конец диапазона
*
* @return {number} - Случайное целое число из переданного диапазона
*/
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

/* Функция для проверки максимальной длины строки.
* Функция взята из https://htmlacademy.ru/
* @param {string} string - Проверяемая строка
* @param {number} length - Максимальная длина строки
*
* @return {boolean} true, если строка проходит по длине, и false — если не проходит
*/
function checkStringLength(string, length) {
  return string.length <= length;
}

// Массив с готовыми комментариями для фотографий
const KOMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Массив с объектами авторов комментариев
const AUTORS = [
  {
    avatarNumber: 1,
    name: 'Артём'
  },
  {
    avatarNumber: 2,
    name: 'Анна'
  },
  {
    avatarNumber: 3,
    name: 'Борис'
  },
  {
    avatarNumber: 4,
    name: 'Виктория'
  },
  {
    avatarNumber: 5,
    name: 'Дмитрий'
  },
  {
    avatarNumber: 6,
    name: 'Елена'
  }
];

// Количество добавляемых объектов 'фотогграфия'
const FOTOS_COUNT = 25;
// Объявдение пустого массива для id комментариев к фотографиям
const сommentIds = [];

// Объявдение пустого массива для id фотографий
const ids = [];

/* Функция получения уникального случайного значения из заданного диапазона
* @param {array} array - Массив чисел, из которых выбирается случайное уникальное число
* @param {number} min - Число, задающее начало диапазона
* @param {number} max - Число, задающее конец диапазона
*
* @return {number} случайное целое число из переданного диапазона
*/
function getUniqueRangeValue(array, min, max) {
  let number = getRandomPositiveInteger(min, max);

  while (array.includes(number)) {
    number = getRandomPositiveInteger(min, max);
  }
  array.push(number);

  return number;
}

/* Функция возврата числа, большего на '1', чем последнее значение в переданном массиве, и добавления его в конец этого массива
* @param {array} array - Массив чисел
*
* @return {number} целое число, увеличенное на '1'
*/
function getNextValue(array) {
  let value = array[array.length - 1];

  if (!value) {
    value = 0;
  }

  value++;
  array.push(value);

  return value;
}

/* Функция создания объекта 'комментарий к фотографии'
* @param {array} autorsArray - Массив авторов комментариев
* @param {array} commentsArray - Массив с комментариями
*
* @return {obgect} объект 'комментарий к фотографии'
*/
function createMessage(autors, comments) {
  const randomAvatarNumber = getRandomPositiveInteger(1, 6) - 1;
  const сommentIndex = [];
  let comment = comments[getUniqueRangeValue(сommentIndex, 0, 5)];

  if (0 === getRandomPositiveInteger(0, 1)) {
    comment = `${comment}
    ${comments[getUniqueRangeValue(сommentIndex, 0, 5)]}`;
  }

  return {
    id: getUniqueRangeValue(сommentIds, 1, 500),
    avatar: `img/avatar-${autors[randomAvatarNumber].avatarNumber}.svg`,
    message: comment,
    name: autors[randomAvatarNumber].name
  };
}

/* Функция создания объекта 'фотография'
* @param {array} autorsArray - Массив авторов комментариев
* @param {array} commentsArray - Массив с комментариями
*
* @return {obgect} объект с 'фотография'
*/
function createFoto() {
  const fotoId = getNextValue(ids);
  const commentsCount = getRandomPositiveInteger(1, 20);
  const messages = [];
  for (let i = 0; i < commentsCount; i++) {
    messages.push(createMessage(AUTORS, KOMMENTS));
  }

  return {
    id: fotoId,
    url: `photos/${fotoId}.jpg`,
    description: `Описание фотографии ${fotoId}`,
    likes: getRandomPositiveInteger(15, 200),
    message: messages
  };
}

const fotos = Array.from({ length: FOTOS_COUNT }, createFoto);

// Временный вызов функций, чтобы ESLint не выводил ошибки о неиспользуемой функции
getRandomPositiveInteger();
