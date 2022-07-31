import { NUMBER_OF_PHOTOS } from './data.js';

// Создаём блок-контейнер для фотоминиатюр, пустой DocumentFragment и получаем шаблон миниатюр
const picturesContainer = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content;

// Генерируем фотоминиатюры из шаблона  и сохраняем в DocumentFragment
function renderGallery(photos, amount = NUMBER_OF_PHOTOS) {
  photos.some((element, i) => {
    if (i < amount) {
      const clonedPicture = pictureTemplate.cloneNode(true);

      clonedPicture.querySelector('.picture__img').setAttribute('src', element.url);
      clonedPicture.querySelector('.picture__img').setAttribute('alt', element.description);
      clonedPicture.querySelector('.picture__comments').textContent = element.comments.length;
      clonedPicture.querySelector('.picture__likes').textContent = element.likes;

      picturesListFragment.appendChild(clonedPicture);
    }
  });

  // Очищаем страницу от старых фотоминиатюр
  const oldPictures = picturesContainer.querySelectorAll('.picture');

  oldPictures.forEach((oldPicture) => {
    oldPicture.remove();
  });

  // Вставляем полученную коллекцию фотоминиатюр в блок-контейнер '.pictures'
  picturesContainer.append(picturesListFragment);
}

export { renderGallery };
