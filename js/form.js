import { resetScale } from './edit-new-photo.js';

const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const descriptionInput = document.querySelector('.text__description');
const hashtagsInput = document.querySelector('.text__hashtags');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');

// Функция открытия формы
function openForm() {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

// Функция закрытия формы
function closeForm() {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetScale();
  imgUploadInput.value = '';
  descriptionInput.value = '';
  hashtagsInput.value = '';

  document.removeEventListener('keydown', onKeydown);
}

// Функция-обработчик открытия формы редактирования изображения
imgUploadInput.addEventListener('change', () => {
  openForm();

  document.addEventListener('keydown', onKeydown);
});

// Функция-обработчик закрытия формы редактирования изображения по нажатию на кнопку #upload-cancel
uploadCancel.addEventListener('click', () => {
  closeForm();
});

// Функция-обработчик закрытия формы редактирования изображения по нажатию на 'Escape'
function onKeydown(evt) {
  // Если фокус находится в поле ввода комментария или хэш-тега, нажатие на Esc не приводит к закрытию формы редактирования изображения
  if (descriptionInput === document.activeElement || hashtagsInput === document.activeElement) {
    return evt;
  } else if (evt.key === 'Escape') {
    closeForm();
  }
}

// Загрузка файла изображения
imgUploadInput.addEventListener('change', () => {
  const file = imgUploadInput.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    imgUploadPreview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    imgUploadPreview.src = '';
  }
});

export {closeForm, onKeydown};
