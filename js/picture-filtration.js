import { debounce, shuffle } from './util.js';
import { renderPicture } from './picture.js';
import { TIMEOUT_DELAY, NUMBER_OF_RANDOM_PHOTOS } from './data.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersButton = document.querySelectorAll('.img-filters__button');

// Функция показа блока фильтров
function showImageFilters() {
  imgFilters.classList.remove('img-filters--inactive');
}

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

// Функция активации выбранного фильтра и деактивации всех остальных
function changeActiveFilter(filter) {
  imgFiltersButton.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filter.classList.add('img-filters__button--active');
}

// Функция-обработчик клика по фильтру 'По умолчанию'
function onFilterDefaultClick(photos, renderPictures) {
  filterDefault.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);
    const photosArray = photos.slice();
    renderPictures(photosArray);
  });
}

// Функция-обработчик клика по фильтру 'Случайные'
function onFilterRandomClick(photos, renderPictures) {
  filterRandom.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);
    const photosArray = photos.slice();

    shuffle(photosArray);
    renderPictures(photosArray, NUMBER_OF_RANDOM_PHOTOS);
  });
}

// Функция-обработчик клика по фильтру 'Обсуждаемые'
function onFilterDiscussionClick(photos, renderPictures) {
  filterDiscussed.addEventListener('click', (evt) => {
    changeActiveFilter(evt.target);

    const photosArray = photos.slice();

    photosArray.sort((a, b) => b.likes - a.likes);

    renderPictures(photosArray);
  });
}

// Функция запуска обработчиков фильтров с добавлением 'debounce' в вызываемые ими функции
function addFilters(photos) {
  onFilterDefaultClick(photos, debounce(renderPicture, TIMEOUT_DELAY));
  onFilterDiscussionClick(photos, debounce(renderPicture, TIMEOUT_DELAY));
  onFilterRandomClick(photos, debounce(renderPicture, TIMEOUT_DELAY));
}

export { showImageFilters, addFilters };
