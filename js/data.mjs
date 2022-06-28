import { getRandomPositiveInteger } from './util.mjs';
import { getUniqueRangeValue } from './util.mjs';
import { getNextValue } from './util.mjs';

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

// Количество добавляемых объектов 'фотография'
const FOTOS_COUNT = 25;
// Объявление пустого массива для id комментариев к фотографиям
const сommentIds = [];

// Объявление пустого массива для id фотографий
const ids = [];

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

function createFotos() {
  return Array.from({ length: FOTOS_COUNT }, createFoto);
}

export { createFotos };
