/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
* Диапазон может быть только положительный, включая ноль.
* Если начало диапазона меньше конца диапазона, то они меняются местами
* Использован метод, изложенный здесь: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
* @param {number} min Число, задающее начало диапазона
* @param {number} max Число, задающее конец диапазона
* @return {number/string} случайное целое число из переданного диапазона или сообщение об ошибке
*/
function returnRandomInteger(min, max) {
  min = parseInt(min, 10);
  max = parseInt(max, 10);

  if (isNaN(min)) {
    return 'Начало диапазона должно быть задано числом';
  }

  if (isNaN(max)) {
    return 'Конец диапазона должен быть задан числом';
  }

  if (min === max) {
    return 'Начальное число диапазона равно конечному';
  }

  if (min < 0 || max < 0) {
    return 'Диапазон может быть только положительный';
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
