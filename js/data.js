// Задержка для установки таймаута функции debounce
const TIMEOUT_DELAY = 500;

// Количество отображаемых фотографий
const NUMBER_OF_PHOTOS = 25;

// Количество отображаемых случайных фотографий
const NUMBER_OF_RANDOM_PHOTOS = 10;

// Количество отображаемых и добавляемых к ним скрытых комментариев
const MAX_COUNT_COMMENT_SHOW = 5;
const ADD_COUNT_SHOW = 5;

// Максимальное количество знаков в комментарии не может составлять больше 140 символов. Ограничение задано в блоке '.text__description'

// Максимальное количество знаков в хэш-теге к добавляемому изображению и максимальное количество хэш-тэгов
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

// Параметры загружаемого изображения согласно ТЗ
const DEFAULT_SCALE = 100;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const CHANGE_STEP = 25;

// Эффекты, накладываемые на загружаемое изображение и их параметры согласно ТЗ
const DEFAULT_START_VALUE = 100;
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

// Продолжительность отображения окна ошибки
const ALERT_SHOW_TIME = 5000;

export { MAX_COUNT_COMMENT_SHOW, ADD_COUNT_SHOW, MAX_HASHTAG_LENGTH, MAX_HASHTAG_COUNT, DEFAULT_SCALE, MIN_SCALE_VALUE, MAX_SCALE_VALUE, CHANGE_STEP, DEFAULT_START_VALUE, sliderOptions, ALERT_SHOW_TIME, TIMEOUT_DELAY, NUMBER_OF_PHOTOS, NUMBER_OF_RANDOM_PHOTOS };
