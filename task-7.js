// Задача 7.

// Есть массив функций, напишите код, который вызовет каждую функцию в этом массиве
// и выведет их порядковый номер. Однако, вызов каждой функции должен
// происходить только после вызова предыдущей функции.

// Решение 1. Если функции массива являются синхронными.

function syncFunc1 () {console.log('The first sync function was invoked')};
function syncFunc2 () {console.log('The second sync function was invoked')};
function syncFunc3 () {console.log('The third sync function was invoked')};

const syncFuncArr = [syncFunc1, syncFunc2, syncFunc3];

// Переберем массив с помощью цикла и вызовем каждую функцию.
// Поскольку функции синхронные следующая функция вызовется после исполнения предыдущей.

function callSync (arr) {
    for (let i = 0; i < arr.length; i++) {
            arr[i]();
                console.log(i);
    }
}

// Решение 2. Если функции массива являются асинхронными.

// Сэмитируем длительный запрос на сервер с помощью setTimeout.
// В отличие от fetch setTimeout не возвращает promise, поэтому обернем его в promise.

function func1 () {
    return new Promise (resolve => setTimeout(resolve, 5000));
}

function func2 () {
    return new Promise (resolve => setTimeout(resolve, 2500));
}

// Используем также реальный запрос случайной картинки.
// Запрос разрешается выведением кода статуса ответа.

async function func3 () {
    let result = await fetch('https://images.unsplash.com/photo-1695982207544-843360e56f41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80');
    console.log(result.status);
}

let asyncFuncArr = [func1, func2, func3]; 

// Используем async / await, чтобы выполнение кода приостановилось до разрешения promise.
// Вывод номера и вызов следующей функции произойдет только после завершения работы предыдущей.

async function callAll (arr) {
    for (let i = 0; i < arr.length; i++) {
           await arr[i]();
           console.log(i);
    }
}

callAll(asyncFuncArr);