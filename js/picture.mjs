import { createFotos } from './data.mjs';

// Создаём блок-контейнер для фотоминиатюр, пустой DocumentFragment и получаем шаблон миниатюр
const picturesContainer = document.querySelector('.pictures');
const pictureыListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content;

// Генерируем набор объектов фотографий с атрибутами
const pictures = createFotos();

// Генерируем фотоминиатюры из шаблона  и сохраняем в DocumentFragment
pictures.forEach((picture) => {
  const clonePicture = pictureTemplate.cloneNode(true);

  clonePicture.querySelector('.picture__img').setAttribute('src', picture.url);
  clonePicture.querySelector('.picture__comments').textContent = picture.message.length;
  clonePicture.querySelector('.picture__likes').textContent = picture.likes;

  pictureыListFragment.appendChild(clonePicture);
});

// Вставляем полученную коллекцию фотоминиатюр в блок-контейнер '.pictures'
picturesContainer.append(pictureыListFragment);
