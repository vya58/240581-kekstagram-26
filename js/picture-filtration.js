import { debounce, shuffle } from './util.js';
import { renderGallery } from './picture.js';
import { TIMEOUT_DELAY, NUMBER_OF_RANDOM_PHOTOS } from './data.js';

const imgFiltersContainer = document.querySelector('.img-filters');
const imgFilterButtons = document.querySelectorAll('.img-filters__button');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

// Функция активации выбранного фильтра и деактивации всех остальных
function changeActiveFilter(filter) {
  imgFilterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filter.classList.add('img-filters__button--active');
}

// Функция-обработчик клика по фильтру 'По умолчанию'
function listenDefaultFilterClick(photos, renderPictures) {
  filterDefault.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);

    const copiedPhotos = photos.slice();

    renderPictures(copiedPhotos);
  });
}

// Функция-обработчик клика по фильтру 'Случайные'
function listenRandomFilterClick(photos, renderPictures) {
  filterRandom.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);

    const copiedPhotos = photos.slice();

    shuffle(copiedPhotos);
    renderPictures(copiedPhotos, NUMBER_OF_RANDOM_PHOTOS);
  });
}

// Функция-обработчик клика по фильтру 'Обсуждаемые'
function listenDiscussedFilterClick(photos, renderPictures) {
  filterDiscussed.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);

    const copiedPhotos = photos.slice();

    copiedPhotos.sort((a, b) => b.comments.length - a.comments.length);
    renderPictures(copiedPhotos);
  });
}

// Функция запуска обработчиков фильтров с добавлением 'debounce' в вызываемые ими функции
function initFilters(photos) {
  imgFiltersContainer.classList.remove('img-filters--inactive');
  listenDefaultFilterClick(photos, debounce(renderGallery, TIMEOUT_DELAY));
  listenDiscussedFilterClick(photos, debounce(renderGallery, TIMEOUT_DELAY));
  listenRandomFilterClick(photos, debounce(renderGallery, TIMEOUT_DELAY));
}

export { initFilters };
