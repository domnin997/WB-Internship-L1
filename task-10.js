// Задача 10

// Реализовать функцию конвертации строки в JSON

const JSONStringify = (obj) => {

    // создаем проверки на различные типы данных, чтобы вернуть в итоговую 
    // строку нужные значения

    // массив - разновидность объекта в JS
    // если массив, для него применяется своя функция (ниже)
    const isArray = (value) => {
      return Array.isArray(value) && typeof value === 'object';
    };
    
    // проверим, что объект - не массив (по причинам выше)
    // если объект, для него применяется своя функция (ниже)
    const isObject = (value) => {
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    };
    
    const isString = (value) => {
      return typeof value === 'string';
    };
  
    const isBoolean = (value) => {
      return typeof value === 'boolean';
    };
  
    const isNumber = (value) => {
      return typeof value === 'number';
    };
    
    // тип null является number, проводим доп проверку через typeof value
    const isNull = (value) => {
      return value === null && typeof value === 'object';
    };
  
    // тип NaN является number, проводим доп проверку через isNaN
    const isNotNumber = (value) => {
      return typeof value === 'number' && isNaN(value);
    };
    
    // тип Infinity является number, проводим доп проверку через isFinite
    const isInfinity = (value) => {
      return typeof value === 'number' && !isFinite(value);
    };
  
    const isDate = (value) => {
      return typeof value === 'object' && value !== null && typeof value.getMonth === 'function';
    };
  
    const isUndefined = (value) => {
      return value === undefined && typeof value === 'undefined';
    };
  
    const isFunction = (value) => {
      return typeof value === 'function';
    };
  
    const isSymbol = (value) => {
      return typeof value === 'symbol';
    };
    
    // если значение попадает под тип, то вернем его либо с кавычками, либо без
    const restOfDataTypes = (value) => {
      return isNumber(value) || isString(value) || isBoolean(value);
    };
    
    // JSON.stringify пропускает часть типов данных: функции, символы, undefined
    // поэтому добавляем проверку на данные типы
    const ignoreDataTypes = (value) => {
      return isUndefined(value) || isFunction(value) || isSymbol(value);
    };
    
    // NaN, Infinity преобразуются в null
    const nullDataTypes = (value) => {
      return isNotNumber(value) || isInfinity(value) || isNull(value);
    }
    
    // внутренняя проверка для массива - вместо этих типов ставим null
    const arrayValuesNullTypes = (value) => {
      return isNotNumber(value) || isInfinity(value) || isNull(value) || ignoreDataTypes(value);
    }
    
    // функция удаления последней запятой, выставленной у массива или объекта
    const removeComma = (str) => {
      const tempArr = str.split('');
      tempArr.pop();
      return tempArr.join('');
    };
  
    // если встретися вне массива/ объекта - вернется undefined, для массива/ объекта реализация ниже
    if (ignoreDataTypes(obj)) {
      return undefined;
    }
  
    if (isDate(obj)) {
      // вернет строку в ISO формате
      return `"${obj.toISOString()}"`;
    }
    
    // значения, приводимые к null, вернут null
    if (nullDataTypes(obj)) {
      return `${null}`
    }
    
    // принцип, как у undefined
    if (isSymbol(obj)) {
      return undefined;
    }

    // если ничего из вышеперчисленного, то обработаем как строку, boolean или null
    if (restOfDataTypes(obj)) {
      // если приходит строка, добавляем двойные кавычки
      // если иной тип данных (boolean, num), не ставим кавычек
      const passQuotes = isString(obj) ? `"` : '';
      return `${passQuotes}${obj}${passQuotes}`;
    }
  
    if (isArray(obj)) {
      
      let arrStr = '';
      // переберм каждое значение массива и в зависимости от его типа
      // запишем в строку рекурсивный вызов stringify для null или самого значения 
      obj.forEach((eachValue) => {
        arrStr += arrayValuesNullTypes(eachValue) ? JSONStringify(null) : JSONStringify(eachValue);
        arrStr += ','
      });
      // после окончания перебора вернем строку, окруженную скобками []
      return  `[` + removeComma(arrStr) + `]`;
    }
    
    if (isObject(obj)) {
        
      let objStr = '';
      // для объекта сначала получим массив ключей
      const objKeys = Object.keys(obj);
      // переберем массив ключей и каждому ключу подберем значение из полученного объекта
      objKeys.forEach((eachKey) => {
          const eachValue = obj[eachKey];
      // в итоговую строку в зависимости от итога проверки запишем:
      // 1) Ключ + значение - результат рекурсивного вызова stringify 2) пустую строку, если это игнорируемый тип
          objStr +=  (!ignoreDataTypes(eachValue)) ? `"${eachKey}":${JSONStringify(eachValue)},` : '';
      });

      // вернем строку, обернутую в скобки объекта { }
      return `{` + removeComma(objStr) + `}`;
    }
  };