import { messages } from './picture.mjs';

const body = document.querySelector('body');

// Элементы окна полноразмерного изображения
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');
const bigPictureSrc = bigPicture.querySelector('.big-picture__img > img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');

// Элементы комментариев к изображению
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentBlock = bigPicture.querySelectorAll('.social__comment');

// Коллекция фотоминиатюр
const pictureCollection = document.querySelectorAll('.picture');

// Закрытие окна полноразмерного изображения по клику иконки закрытия
bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

// Закрытие окна полноразмерного изображения по нажатию клавиши 'Escape'
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

// Объявляем переменную-счётчик для перебора массива с комментариями вместе с 'pictureCollection'
let countMessage = 0;

// Формируем данные для отображения окна с полноразмерным изображением
pictureCollection.forEach((picture) => {
  const comments = messages[countMessage];

  // Формируем полноразмерное изображение по клику на фотоминиатюру
  picture.addEventListener('click', () => {
    //Создаём пустой DocumentFragment для списка с комментариями
    const commentsBlockFragment = document.createDocumentFragment();

    // Удаляем имеющиеся комментарии
    for (let i = commentsBlock.children.length - 1; i >= 0; i--) {
      const child = commentsBlock.children[i];
      child.parentElement.removeChild(child);
    }

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    // Передаем данные в разметку полноразмерного изображения из фотоминиатюр
    bigPictureSrc.setAttribute('src', picture.querySelector('.picture__img').src);
    bigPictureDescription.textContent = picture.querySelector('.picture__img').alt;
    bigPictureLikes.textContent = picture.querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = picture.querySelector('.picture__comments').textContent;

    // Генерируем блоки комментариев и сохраняем в DocumentFragment
    comments.forEach((comment) => {
      // Клонируем один блок комментария из разметки
      const cloneCommentBlock = commentBlock[0].cloneNode(true);

      cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('src', comment.avatar);
      cloneCommentBlock.querySelector('.social__comment > .social__picture').setAttribute('alt', comment.name);
      cloneCommentBlock.querySelector('.social__text').textContent = comment.message;

      commentsBlockFragment.appendChild(cloneCommentBlock);
    });

    commentsBlock.append(commentsBlockFragment);
  });

  countMessage++;
});
