// Минимальный, максимальный размер изображения и шаг его изменения согласно ТЗ
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const CHANGE_STEP = 25;

// Эффекты, накладываемые на загружаемое изображение и их параметры согласно ТЗ
const sliderOptions = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderFieldset = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');

let scale = parseInt(scaleControlValue.value, 10);

// Функция применения изменений значения размера изображения
function applyingScale() {
  scaleControlValue.value = `${scale}%`;
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
}

// Функция уменьшения размера изображения
function decreaseSize() {
  if (scale > MIN_SCALE_VALUE) {
    scale -= CHANGE_STEP;
    applyingScale();
  }
}

// Функция увеличения размера изображения
function increasSize() {
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
  start: 100,
  step: 1,
  connect: 'lower',
});

// По умолчанию загрузка превью фото без эффекта и слайдер скрыт
sliderFieldset.classList.add('hidden');

// Функция-обработчик нажатия на иконки эффектов
function getEffectsItem(evt) {
  if (evt.target.matches('.effects__radio')) {
    const nameEffectsItem = evt.target.value;
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.classList.add(`effects__preview--${nameEffectsItem}`);

    if (nameEffectsItem === 'none') {
      imgUploadPreview.removeAttribute('class');
      imgUploadPreview.removeAttribute('style');
      sliderFieldset.classList.add('hidden');
      effectLevelValue.value = 100;
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
effectsList.addEventListener('change', getEffectsItem);

// Обработчик событий слайдера
sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  applyingEffect();
});
