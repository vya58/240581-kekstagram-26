import { pictures } from './main.js';
import { closeByEscKeydown, getPartString } from './util.js';
import { MAX_COUNT_COMMENT_SHOW, ADD_COUNT_SHOW } from './data.js';

const body = document.querySelector('body');

// Элементы окна полноразмерного изображения
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');
const bigPictureSrc = bigPicture.querySelector('.big-picture__img > img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const socialCommentCountFirstSpan = bigPicture.querySelector('.social__comment-count').firstChild;
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const picturesContainer = document.querySelector('.pictures');
const comentsAddButton = bigPicture.querySelector('.social__comments-loader');

// Элементы комментариев к изображению
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentBlock = bigPicture.querySelectorAll('.social__comment');

// Функция-обработчик закрытия окна по нажатию на 'Escape'
function onBigPictureEscKeydown(evt) {
  closeByEscKeydown(closeBigPicture, evt);
}

// Функция показа окна полноразмерного изображения и добавление обработчика для закрытия
function openBigPicture() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

// Функция скрытия окна полноразмерного изображения и удаление обработчика для закрытия
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
  let openComments = comenntsElementsAll.length - comenntsElementsHidden.length;

  // Добавляем отображение скрытых комментариев в количестве, заданном константой 'ADD_COUNT_SHOW', но не более имеющегося остатка
  let add = 0;
  for (let i = 0; i < ADD_COUNT_SHOW; i++) {
    if (i < comenntsElementsHidden.length) {
      comenntsElementsHidden[i].classList.remove('hidden');
      add++;
    }
  }
  openComments += add;

  // Изменяем число показанных комментариев в блоке '.social__comment-count'
  socialCommentCountFirstSpan.textContent = `${openComments} из `;
}

// Функция получения порядкового номера элемента массива объектов фотоминиатюр по её id
function getElementArrayNumber(arrayPictures, pictId) {
  for (let i = 0; i < arrayPictures.length; i++) {
    if ((arrayPictures[i].id + 1) === Number(pictId)) {
      return i;
    }
  }
}

// Функция генерации блоков комментариев к фотоминиатюре с соответствующим id и вставки их в разметку
function generateBlockFragment(arrayComments) {

  //Создаём пустой DocumentFragment для списка с комментариями
  const commentsBlockFragment = document.createDocumentFragment();

  // Генерируем блоки комментариев к фотоминиатюре с соответствующим id и сохраняем в DocumentFragment
  for (let i = 0; i < arrayComments.length; i++) {

    // Клонируем один блок комментария-образца из разметки
    const cloneCommentBlock = commentBlock[0].cloneNode(true);

    // Передаем данные в разметку блок комментария
    cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('src', arrayComments[i].avatar);
    cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('alt', arrayComments[i].name);
    cloneCommentBlock.querySelector('.social__text').textContent = arrayComments[i].message;

    if (i >= MAX_COUNT_COMMENT_SHOW) {
      cloneCommentBlock.classList.add('hidden');
    }
    commentsBlockFragment.appendChild(cloneCommentBlock);
  }
  commentsBlock.append(commentsBlockFragment);
}

// Обработчик событий на коллекции фотоминиатюр
function onListClick(evt) {
  if (evt.target.matches('.picture__img')) {
    const target = evt.target;

    // Удаляем имеющиеся комментарии-образцы
    for (let j = commentsBlock.children.length - 1; j >= 0; j--) {
      const child = commentsBlock.children[j];
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
    const elementArray = getElementArrayNumber(pictures, idFoto);
    const photoComments = pictures[elementArray].comments;
    const commentCount = photoComments.length;

    // Передаем данные в разметку полноразмерного изображения из фотоминиатюр
    bigPictureSrc.setAttribute('src', target.src);
    bigPictureDescription.textContent = target.alt;
    bigPictureLikes.textContent = target.nextElementSibling.querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = target.nextElementSibling.querySelector('.picture__comments').textContent;

    if (commentCount < MAX_COUNT_COMMENT_SHOW) {
      socialCommentCountFirstSpan.textContent = `${commentCount} из `;
    } else {
      socialCommentCountFirstSpan.textContent = `${MAX_COUNT_COMMENT_SHOW} из `;
    }
    generateBlockFragment(photoComments);
  }
}

// Отображение дополнительных комментариев по клику иконки закрытия
comentsAddButton.addEventListener('click', () => {
  addСomments();
});

picturesContainer.addEventListener('click', onListClick);
