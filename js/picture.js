import { NUMBER_OF_PHOTOS } from './data.js';

// Создаём блок-контейнер для фотоминиатюр, пустой DocumentFragment и получаем шаблон миниатюр
const picturesContainer = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content;

// Генерируем фотоминиатюры из шаблона  и сохраняем в DocumentFragment
function renderGallery(photos, amount = NUMBER_OF_PHOTOS) {

  for (let i = 0; i < photos.length; i++) {
    if (i >= amount) {
      break;
    }
    const clonedPicture = pictureTemplate.cloneNode(true);

    clonedPicture.querySelector('.picture__img').setAttribute('src', photos[i].url);
    clonedPicture.querySelector('.picture__img').setAttribute('alt', photos[i].description);
    clonedPicture.querySelector('.picture__comments').textContent = photos[i].comments.length;
    clonedPicture.querySelector('.picture__likes').textContent = photos[i].likes;

    picturesListFragment.appendChild(clonedPicture);
  }

  // Очищаем страницу от старых фотоминиатюр
  const oldPictures = picturesContainer.querySelectorAll('.picture');

  oldPictures.forEach((oldPicture) => {
    oldPicture.remove();
  });

  // Вставляем полученную коллекцию фотоминиатюр в блок-контейнер '.pictures'
  picturesContainer.append(picturesListFragment);
}

export { renderGallery };
