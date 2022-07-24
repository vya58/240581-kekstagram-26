import { NUMBER_OF_PHOTOS } from './data.js';

// Создаём блок-контейнер для фотоминиатюр, пустой DocumentFragment и получаем шаблон миниатюр
const picturesContainer = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content;

// Генерируем фотоминиатюры из шаблона  и сохраняем в DocumentFragment
function renderPicture(pictures, amount = NUMBER_OF_PHOTOS) {
  for (let i = 0; i < pictures.length; i++) {
    if (i >= amount) {
      break;
    }
    const clonePicture = pictureTemplate.cloneNode(true);

    clonePicture.querySelector('.picture__img').setAttribute('src', pictures[i].url);
    clonePicture.querySelector('.picture__img').setAttribute('alt', pictures[i].description);
    clonePicture.querySelector('.picture__comments').textContent = pictures[i].comments.length;
    clonePicture.querySelector('.picture__likes').textContent = pictures[i].likes;

    picturesListFragment.appendChild(clonePicture);
  }

  // Очищаем страницу от старых фотоминиатюр
  const oldPictures = picturesContainer.querySelectorAll('.picture');

  oldPictures.forEach((oldPicture) => {
    oldPicture.remove();
  });

  // Вставляем полученную коллекцию фотоминиатюр в блок-контейнер '.pictures'
  picturesContainer.append(picturesListFragment);
}

export { renderPicture };
