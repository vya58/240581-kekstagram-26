import { ALERT_SHOW_TIME, TIMEOUT_DELAY } from './data.js';

/* Функция возврата части строки, находящейся между указанных символов (наборов символов) строки
* @param {string} dissectString - Препарируемая строка
* @param {string} initialString - Начальный символ (слово) препарируемой строки, после которого расположен начальный элемент искомой части строки
* @param {string} closingString - Конечный символ (слово) препарируемой строки, преред которым расположен конечный элемент искомой части строки
*
* @return {string} Часть строки, находящаяся между указанных символов (наборов символов) строки
*/
function getPartString(dissectString, initialString, closingString) {
  const firstIndex = dissectString.indexOf(initialString);
  const closingIndex = dissectString.indexOf(closingString);
  const initialStringLength = initialString.length;
  const delta = closingIndex - firstIndex - initialStringLength;

  let partString = '';
  for (let i = 0; i < delta; i++) {
    partString += dissectString.charAt(firstIndex + initialStringLength + i);
  }
  return partString;
}

/* Функция получения количества указанного символа в строке
* @param {string} str - Проверяемая строка
* @param {string} symbol - Искомый символ
*
* @return {number} count Количество указанного символа в строке
*/
function getCountSymbol(str, symbol) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === symbol) {
      count++;
    }
  }
  return count;
}

/* Функция создания блока с сообщением об ошибке загрузки данных с сервера
* @param {string} message - Текст сообщения об ошибке
*
*/
function createShowAlert(message) {
  const alertSection = document.createElement('section');
  alertSection.style.position = 'absolute';
  alertSection.style.zIndex = '100';
  alertSection.style.left = '0';
  alertSection.style.top = '0';
  alertSection.style.right = '0';
  alertSection.style.padding = '10px, 3px';
  alertSection.style.fontSize = '30px';

  const alert = document.createElement('div');
  alert.style.position = 'relative';
  alert.style.width = '90%';
  alert.style.height = '100px';
  alert.style.margin = 'auto';
  alert.style.padding = '40px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.verticalAlign = 'middle';
  alert.textContent = message;
  alert.style.backgroundColor = 'red';

  alertSection.append(alert);

  document.body.append(alertSection);

  setTimeout(() => {
    alertSection.remove();
  }, ALERT_SHOW_TIME);
}

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
function debounce(callback, timeoutDelay = TIMEOUT_DELAY) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция взята из интернета
// Источник - https://learn.javascript.ru/task/shuffle
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Функция удаления лишних пробелов. Взята из интернета и доработана
// Источник - https://habr.com/ru/post/565726
function removeSpaces(str) {
  const formatted = str.replace(/\s{2,}/g, ' ').trim();
  return formatted;
}

export { getPartString, getCountSymbol, createShowAlert, debounce, shuffle, removeSpaces };
