import { getPartString } from './util.js';
import { MAX_COUNT_COMMENT_SHOW, ADD_COUNT_SHOW } from './data.js';

const body = document.querySelector('body');

// Элементы окна полноразмерного изображения
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');
const socialCommentCountFirstSpan = bigPicture.querySelector('.social__comment-count').firstChild;
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const comentsAddButton = bigPicture.querySelector('.social__comments-loader');

// Элементы комментариев к изображению
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentBlock = bigPicture.querySelectorAll('.social__comment');

// Функция-обработчик закрытия окна по нажатию на 'Escape'
function onBigPictureEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

// Функция показа окна полноразмерного изображения и добавление обработчика для закрытия по нажатию на 'Escape'
function openBigPicture() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

// Функция скрытия окна полноразмерного изображения и удаление обработчика для закрытия по нажатию на 'Escape'
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

// Закрытие окна полноразмерного изображения по клику иконки закрытия
bigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

// Функция отображения скрытых комментариев
function addСomments() {
  const comenntsElementsAll = bigPicture.querySelectorAll('.social__comment');
  const comenntsElementsHidden = bigPicture.querySelectorAll('.social__comment + .hidden');
  let openCommentsCount = comenntsElementsAll.length - comenntsElementsHidden.length;

  // Добавляем отображение скрытых комментариев в количестве, заданном константой 'ADD_COUNT_SHOW', но не более имеющегося остатка
  comenntsElementsHidden.forEach((element, i) => {
    if (i < ADD_COUNT_SHOW) {
      element.classList.remove('hidden');
      openCommentsCount++;
    }
  });

  // Изменяем число показанных комментариев в блоке '.social__comment-count'
  socialCommentCountFirstSpan.textContent = `${openCommentsCount} из `;
  return openCommentsCount;
}

// Функция получения порядкового номера элемента массива объектов фотоминиатюр по её id
function getElementArrayNumber(arrayPictures, pictId) {
  return arrayPictures.findIndex((element) => (element.id + 1) === Number(pictId));
}

// Функция генерации блоков комментариев к фотоминиатюре с соответствующим id и вставки их в разметку
function generateBlockFragment(arrayComments) {

  //Создаём пустой DocumentFragment для списка с комментариями
  const commentsBlockFragment = document.createDocumentFragment();

  // Генерируем блоки комментариев к фотоминиатюре с соответствующим id и сохраняем в DocumentFragment
  arrayComments.forEach((element) => {
    // Клонируем один блок комментария-образца из разметки
    const cloneCommentBlock = commentBlock[0].cloneNode(true);

    // Передаем данные в разметку блок комментария
    cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('src', element.avatar);
    cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('alt', element.name);
    cloneCommentBlock.querySelector('.social__text').textContent = element.message;

    if (arrayComments.indexOf(element) >= MAX_COUNT_COMMENT_SHOW) {
      cloneCommentBlock.classList.add('hidden');
    }
    commentsBlockFragment.appendChild(cloneCommentBlock);
  });
  commentsBlock.append(commentsBlockFragment);
}

// Отображение дополнительных комментариев по клику иконки закрытия
comentsAddButton.addEventListener('click', () => {
  const openComments = addСomments();

  // Скрытие кнопки загрузки комметариев, если они закончились
  if (openComments === Number(bigPictureCommentsCount.textContent)) {
    comentsAddButton.classList.add('hidden');
  }
});

// Функция-обработчик клика по коллекции фотоминиатюр
function onListClick(photos) {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img > img');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  const picturesContainer = document.querySelector('.pictures');
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      const target = evt.target;

      // Удаляем имеющиеся комментарии-образцы
      for (let i = commentsBlock.children.length - 1; i >= 0; i--) {
        const child = commentsBlock.children[i];
        child.parentElement.removeChild(child);
      }

      // Показываем окно полноразмерного изображения
      openBigPicture();

      // Получаем id фотоминиатюры из её атрибута src
      const srcFoto = target.src;
      const firstString = 'photos/';
      const closeString = '.';
      const idFoto = getPartString(srcFoto, firstString, closeString);

      // Сохраняем порядковый номер фотоминиатюры, массив с комментариями и их количество из коллекции изображений 'pictures'
      const elementArray = getElementArrayNumber(photos, idFoto);
      const photoComments = photos[elementArray].comments;
      const commentCount = photoComments.length;

      // Передаем данные в разметку полноразмерного изображения из фотоминиатюр
      bigPictureImage.setAttribute('src', target.src);
      bigPictureDescription.textContent = target.alt;
      bigPictureLikesCount.textContent = target.nextElementSibling.querySelector('.picture__likes').textContent;
      bigPictureCommentsCount.textContent = target.nextElementSibling.querySelector('.picture__comments').textContent;

      // Отображение количества комментариев и состояние кнопки загрузки скрытых комментариев в этой связи
      if (commentCount <= MAX_COUNT_COMMENT_SHOW) {
        socialCommentCountFirstSpan.textContent = `${commentCount} из `;
        comentsAddButton.classList.add('hidden');
      } else {
        socialCommentCountFirstSpan.textContent = `${MAX_COUNT_COMMENT_SHOW} из `;
        comentsAddButton.classList.remove('hidden');
      }
      generateBlockFragment(photoComments);
    }
  });
}

// Функция запуска обработчика клика на коллекцию фотоминиатюр
function initBigPicture(photos) {
  const copiedPhotos = photos.slice();
  onListClick(copiedPhotos);
}

export { initBigPicture };
