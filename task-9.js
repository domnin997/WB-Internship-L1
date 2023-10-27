// Задача 9

// Реализовать функцию конвертации JSON в строку
// + согласно комментариям в ТГ канале, требуется аналог parse()

// Решение

const parseJSON = function (json) {
  
  const firstAndLastChars = function (first, last) {
    return (str) => str[0] === first && str[str.length - 1] === last
  }

  const isArray = firstAndLastChars('[', ']'); // определяем по крайним символам, является ли строка массивом
  const isObj = firstAndLastChars('{', '}'); // аналогично с объектом
  const hasDoubleQuotes = firstAndLastChars('"', '"'); // и строками
  const hasSingleQuotes = firstAndLastChars("'", "'");
  const isNumber = (str) => (+(str)) + '' === str;

  const isString = function (str) {
    str = str.trim()
    return (hasSingleQuotes(str) || hasDoubleQuotes(str)) && str[str.length - 2] !== '\\';
  }
  
  const removeFirstAndLastChar = function (str) {
    str = str.trim();
    return str.slice(1, str.length - 1) || '';
  };

  const splitBySymb = function (baseSymb) {
    
    return function (str) {
      let result = [];
      let doubleStrOpen = false;
      let singleStrOpen = false;
      let arrOpen = false;
      let objOpen = false;
      let arrBracketCount = 0;
      let objBracketCount = 0;
      let currStr = '';
      
      // проведем проверку каждого символа строки
      for (let i = 0; i < str.length; i += 1) {
        let symb = str[i]

        if (symb === '"') {
          doubleStrOpen = !doubleStrOpen;
        }

        if (symb === "'") {
          singleStrOpen = !singleStrOpen;
        }

        if (symb === '[') {
          arrBracketCount += 1;
          arrOpen = true;
        }

        if (symb === ']') {
          arrBracketCount -= 1;
          if (arrBracketCount === 0) {
            arrOpen = false;
          }
        }

        if (symb === '{') {
          objBracketCount += 1;
          objOpen = true;
        }

        if (symb === '}') {
          objBracketCount -= 1;
          if (objBracketCount === 0) {
            objOpen = false;
          }
        }
        
        // если символ является , или : (в зависимости от аргумента),
        // и этот символ не находится внутри вложенного объекта, массива или строки
        // то поместим строку в массив результатов

        if (symb === baseSymb && !doubleStrOpen && !singleStrOpen && !arrOpen && !objOpen) {
          if (currStr !== '') result.push(currStr.trim())
          currStr = '';
        // иначе запишем символ в строку
        } else {
          currStr += symb;
        }
      }
      
      if (currStr !== '') result.push(currStr.trim())
        return result
    };
  }

  const separeateStringByCommas = splitBySymb(',');
  const separeateStringByColons = splitBySymb(':');

  const parseJSONString = function (str) {
    
    str = str.trim();

    if (isArray(str)) {
      // проверим, является ли строка массивом, и если да
      // то разобьем её на массивы по запятой и вызовем функцию рекурсивно в отношении резульатов
      return separeateStringByCommas(removeFirstAndLastChar(str)).map(parseJSONString);
    };

    if (isObj(str)) {
      
      let obj = {};

      let objParsed = separeateStringByCommas(removeFirstAndLastChar(str));
      
      // objParsed будет содержать массив строк с ключами и значениями

      objParsed.forEach(function (val) {
      // переберем эти строки и каждую разобьем по двоеточию
        let keyValPair = separeateStringByColons(val) // передаем строку на разделение
        if (keyValPair.length === 2) {
          // в отношении и ключа, и значения вызываем parseJSONString
          // и результаты запишем как ключ - значение возвращаемого объекта
            obj[parseJSONString(keyValPair[0])] = parseJSONString(keyValPair[1])
        }
      })
      
      return obj
    }

    if (isString(str)) return removeFirstAndLastChar(str).replace(/([\\]{1})([\\\"]{1})/g, '$2')
    if (isNumber(str)) return +str
    if (str === 'null') return null
    if (str === 'false') return false
    if (str === 'true') return true
    if (str === 'undefined') return undefined
    throw new SyntaxError('Unexpected end of input')
  }
  
  return parseJSONString(json);

}

// далее идет пример для теста

let testJSON =  JSON.stringify({
  name: 'Yan',
  age: 29,
  engineer: true,
  expertise: ['html', 'css', 'react'],
  address: {
    city: 'Moscow',
    state: 'Rus'
  }
})

console.log(parseJSON(testJSON));