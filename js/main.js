/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
* Диапазон может быть только положительный, включая ноль.
* Если начало диапазона меньше конца диапазона, то они меняются местами
* Использован метод, изложенный здесь: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
* @param {number} min Число, задающее начало диапазона
* @param {number} max Число, задающее конец диапазона
* @return {number/undefined} случайное целое число из переданного диапазона или undefined
*/
function returnRandomInteger(minNumber, maxNumber) {
  let min = Number(minNumber);
  let max = Number(maxNumber);

  if (isNaN(min) || isNaN(max) || min === max || min < 0 || max < 0) {
    return undefined;
  }

  if (min > max) {
    const tempNumber = min;
    min = max;
    max = tempNumber;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Функция для проверки максимальной длины строки.
* @param {string} string Проверяемая строка
* @param {number} maxLength Максимальная длина строки
* @return {boolean} true, если строка проходит по длине, и false — если не проходит
*/
function getStringLength(string, maxLength) {
  maxLength = parseInt(maxLength, 10);

  if (string.length > maxLength) {
    return false;
  }

  return true;
}

// Временный вызов функций, чтобы ESLint не выводил ошибки о неиспользуемой функции
returnRandomInteger();
getStringLength();
