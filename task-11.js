// Задача 11.
// Задача о замыканиях и области видимости: напишите функцию, которая возвращает другую
// функцию. Внутренняя функция должна иметь доступ к переменной, определенной во внешней
// функции, даже после того, как внешняя функция завершила свое выполнение.

function getParam () {
    
    const sign = `
    Kind regards,
    Brendan Eich`;

    return function (outParam) {
        return `${outParam} 
                ${sign}`;
    }
}

const newFunc = getParam();
console.log(newFunc('I made this code possible.'));