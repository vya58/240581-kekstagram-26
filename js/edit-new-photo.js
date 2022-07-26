import {DEFAULT_SCALE, MIN_SCALE_VALUE, MAX_SCALE_VALUE, CHANGE_STEP, DEFAULT_START_VALUE, sliderOptions} from './data.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const effectsList = document.querySelector('.effects__list');
const effectsNone = effectsList.querySelector('#effect-none');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderFieldset = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');

// Сохраняем значение масштаба изображения из разметки
let scale = parseInt(scaleControlValue.value, 10);

// Функция применения изменений значения размера изображения
function resetScale() {
  scaleControlValue.value = DEFAULT_SCALE;
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.removeAttribute('style');
  effectsNone.checked = true;
  sliderFieldset.classList.add('hidden');
  effectLevelValue.value = DEFAULT_START_VALUE;
  sliderElement.noUiSlider.set(DEFAULT_START_VALUE);
}

// Функция применения изменений значения размера изображения
function applyingScale() {
  scaleControlValue.value = `${scale}%`;
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
}

// Функция уменьшения размера изображения
function decreaseSize() {
  scale = parseInt(scaleControlValue.value, 10);
  if (scale > MIN_SCALE_VALUE) {
    scale -= CHANGE_STEP;
    applyingScale();
  }
}

// Функция увеличения размера изображения
function increasSize() {
  scale = parseInt(scaleControlValue.value, 10);
  if (scale < MAX_SCALE_VALUE) {
    scale += CHANGE_STEP;
    applyingScale();
  }
}

// Создание слайдера с помощью библиотеки noUiSlider и задание начальных значений
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: DEFAULT_START_VALUE,
  step: 1,
  connect: 'lower',
});

// По умолчанию загрузка превью фото без эффекта и слайдер скрыт
sliderFieldset.classList.add('hidden');

// Функция-обработчик нажатия на иконки эффектов
function onEffectsItemClick(evt) {
  let nameEffectsItem = 'none';
  if (evt.target.matches('.effects__radio')) {
    nameEffectsItem = evt.target.value;
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.classList.add(`effects__preview--${nameEffectsItem}`);

    if (nameEffectsItem === 'none') {
      imgUploadPreview.removeAttribute('class');
      imgUploadPreview.removeAttribute('style');
      sliderFieldset.classList.add('hidden');
      effectLevelValue.value = DEFAULT_START_VALUE;
    } else {
      sliderFieldset.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions(sliderOptions[nameEffectsItem]);
    }
  }
}

// Функция изменения стилей изображения
function applyingEffect() {
  if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  }
  if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
  }
}

// Обработчики событий по клику на кнопки 'Уменьшить' и 'Увеличить'
scaleControlSmaller.addEventListener('click', decreaseSize);
scaleControlBigger.addEventListener('click', increasSize);

// Обработчик событий на списке эффектов
effectsList.addEventListener('change', onEffectsItemClick);

// Обработчик событий слайдера
sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  applyingEffect();
});

export { resetScale };
