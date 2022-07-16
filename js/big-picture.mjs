import { pictures } from './picture.mjs';
import { closeByEscKeydown, getPartString } from './util.mjs';

const body = document.querySelector('body');

// Элементы окна полноразмерного изображения
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');
const bigPictureSrc = bigPicture.querySelector('.big-picture__img > img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const picturesContainer = document.querySelector('.pictures');

// Элементы комментариев к изображению
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
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
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

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

// Функция получения порядкового номера элемента массива объектов фотоминиатюр по её id
function getElementArrayNumber(arrayPictures, pictId) {
  for (let i = 0; i < arrayPictures.length; i++) {
    if (arrayPictures[i].id === Number(pictId)) {
      return i;
    }
  }
}

// Обработчик событий на коллекци фотоминиатюр
const onListClick = function (evt) {
  if (evt.target.matches('.picture__img')) {
    const target = evt.target;

    //Создаём пустой DocumentFragment для списка с комментариями
    const commentsBlockFragment = document.createDocumentFragment();

    // Удаляем имеющиеся комментарии-образцы
    for (let j = commentsBlock.children.length - 1; j >= 0; j--) {
      const child = commentsBlock.children[j];
      child.parentElement.removeChild(child);
    }

    // Показываем окно полноразмерного изображения
    openBigPicture();

    // Передаем данные в разметку полноразмерного изображения из фотоминиатюр
    bigPictureSrc.setAttribute('src', target.src);
    bigPictureDescription.textContent = target.alt;
    bigPictureLikes.textContent = target.nextElementSibling.querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = target.nextElementSibling.querySelector('.picture__comments').textContent;

    // Получаем id фотоминиатюры из её атрибута src
    const srcFoto = target.src;
    const firstString = 'photos/';
    const closeString = '.';
    const idFoto = getPartString(srcFoto, firstString, closeString);

    // Находим порядковый номер фотоминиатюры в коллекции изображений 'pictures'
    const elementArray = getElementArrayNumber(pictures, idFoto);

    // Генерируем блоки комментариев к фотоминиатюре с соответствующим id и сохраняем в DocumentFragment
    pictures[elementArray].message.forEach((comment) => {
      // Клонируем один блок комментария-образца из разметки
      const cloneCommentBlock = commentBlock[0].cloneNode(true);

      // Передаем данные в разметку блок комментария
      cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('src', comment.avatar);
      cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('alt', comment.name);
      cloneCommentBlock.querySelector('.social__text').textContent = comment.message;

      commentsBlockFragment.appendChild(cloneCommentBlock);

    });

    commentsBlock.append(commentsBlockFragment);
  }

};

picturesContainer.addEventListener('click', onListClick);
