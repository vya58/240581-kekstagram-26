import { closeByEscKeydown } from './util.js';
import { resetScale } from './edit-new-photo.js';

const uploadFile = document.querySelector('#upload-file');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');
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
  uploadFile.value = '';
  textDescription.value = '';
  textHashtags.value = '';

  document.removeEventListener('keydown', onUploadCancelEscKeydown);
}

// Функция-обработчик открытия формы редактирования изображения
uploadFile.addEventListener('change', () => {
  openForm();

  document.addEventListener('keydown', onUploadCancelEscKeydown);
});

// ОФункция-обработчик закрытия формы редактирования изображения по нажатию на кнопку #upload-cancel
uploadCancel.addEventListener('click', () => {
  closeForm();
});

// Функция-обработчик закрытия формы редактирования изображения по нажатию на 'Escape'
function onUploadCancelEscKeydown(evt) {
  // Если фокус находится в поле ввода комментария или хэш-тега, нажатие на Esc не приводит к закрытию формы редактирования изображения
  if (textDescription === document.activeElement || textHashtags === document.activeElement) {
    return evt;
  } else {
    closeByEscKeydown(closeForm, evt);
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

export {closeForm, onUploadCancelEscKeydown};
