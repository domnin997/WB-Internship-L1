// Задача 8.
// напишите функцию, которая будет принимать массив функций и возвращать
// новую функцию, которая вызывает каждую функцию в этом массиве и
// возвращает массив результатов, полученных после вызова
// каждой функции.

function getFunc (arr) {

    return function () {

        let outputArr = [];

        arr.forEach (func => {
            outputArr.push(func());
        });
        return outputArr;
    }
}

const testArr = [func1, func2];
const testArr2 = [func2, func3];

// ()=>{1 + 2}, ()=>{4 + 4}, ()=>{6 + 6}

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
newFunc();
newFunc();
console.log(newFunc(), secFunc());