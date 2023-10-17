// Задача 8.

// Напишите функцию, которая будет принимать массив функций и возвращать
// новую функцию, которая вызывает каждую функцию в этом массиве и
// возвращает массив результатов, полученных после вызова
// каждой функции.

function getFunc (arr) {

    return function () {
        
        let outputArr = [];

// Чтобы при новом вызове массив результатов не дублировал предыдущий,
// а создавался заново, поместим его в тело возвращаемой функции.

            arr.forEach (func => {
                outputArr.push(func());
            });

// После завершения выполнения внешней функции внутренняя сохранит ссылку на arr,
// т.к. этот массив используется в ее работе, а внутри неё нет аналогичной переменной.

        return outputArr;
    }
}

const testArr = [func1, func2];
const testArr2 = [func2, func3];

function func1 () {
    return 2+4;
}

function func2 () {
    return 7+7;
}

function func3 () {
    return 9+6;
}

let newFunc = getFunc(testArr);
const secFunc = getFunc(testArr2);

console.log(newFunc(), secFunc());

// Полученные функции независимы, и используют каждая свой массив.