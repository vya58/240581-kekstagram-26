/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
* Функция взята из интернета и доработана https://htmlacademy.ru/
* Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
* Диапазон может быть только положительный, включая ноль.
* Дробные значения округляются:
* - нижняя граница диапазона - к ближайшему большему целому с помощью Math.ceil;
* - верхняя граница - к ближайшему меньшему целому с помощью Math.floor.
* Реализована поддержка передачи минимального и максимального значения в любом порядке.
* Переданные отрицательные берутся по модулю с помощью Math.ceil.
* @param {number} a - Число, задающее начало диапазона
* @param {number} b - Число, задающее конец диапазона
*
* @return {number} - Случайное целое число из переданного диапазона
*/
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

/* Функция для проверки максимальной длины строки.
* Функция взята из https://htmlacademy.ru/
* @param {string} string - Проверяемая строка
* @param {number} length - Максимальная длина строки
*
* @return {boolean} true, если строка проходит по длине, и false — если не проходит
*/
function checkStringLength(string, length) {
  return string.length <= length;
}

/* Функция получения уникального случайного значения из заданного диапазона
* @param {array} array - Массив чисел, из которых выбирается случайное уникальное число
* @param {number} min - Число, задающее начало диапазона
* @param {number} max - Число, задающее конец диапазона
*
* @return {number} случайное целое число из переданного диапазона
*/
function getUniqueRangeValue(array, min, max) {
  let number = getRandomPositiveInteger(min, max);

  while (array.includes(number)) {
    number = getRandomPositiveInteger(min, max);
  }
  array.push(number);

  return number;
}

/* Функция возврата числа, большего на '1', чем последнее значение в переданном массиве, и добавления его в конец этого массива
* @param {array} array - Массив чисел
*
* @return {number} целое число, увеличенное на '1'
*/
function getNextValue(array) {
  let value = array[array.length - 1];

  if (!value) {
    value = 0;
  }

  value++;
  array.push(value);

  return value;
}

// Временный вызов функций, чтобы ESLint не выводил ошибки о неиспользуемой функции
getRandomPositiveInteger();

export {getRandomPositiveInteger, getUniqueRangeValue, getNextValue};
