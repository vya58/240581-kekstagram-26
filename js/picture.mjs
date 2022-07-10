import { createFotos } from './data.mjs';

// Создаём блок-контейнер для фотоминиатюр, пустой DocumentFragment и получаем шаблон миниатюр
const picturesContainer = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content;

// Генерируем массив фотографий с атрибутами
const pictures = createFotos();
// Создаём пустой массив для комментариев к фотографиям
const messages = [];

// Генерируем фотоминиатюры из шаблона  и сохраняем в DocumentFragment
pictures.forEach((picture) => {
  const clonePicture = pictureTemplate.cloneNode(true);

  clonePicture.querySelector('.picture__img').setAttribute('src', picture.url);
  clonePicture.querySelector('.picture__img').setAttribute('alt', picture.description);
  clonePicture.querySelector('.picture__comments').textContent = picture.message.length;
  clonePicture.querySelector('.picture__likes').textContent = picture.likes;

  picturesListFragment.appendChild(clonePicture);

  // Наполняем массив с комментариями к фотографиям
  messages.push(picture.message);
});

// Вставляем полученную коллекцию фотоминиатюр в блок-контейнер '.pictures'
picturesContainer.append(picturesListFragment);

export { messages };
