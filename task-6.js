// Задача 6.

// Написать функцию сортировки массива объектов по возрастанию возраста.
// При равных возрастах сортирует по алфавиту по полю name.

// Массив для тестирования работы функции
usersArr = [{
    name: 'Aic',
    age: 25,
}, {
    name: 'Elena',
    age: 45,
}, {
    name: 'Vova',
    age: 15,
}, {
    name: 'Kirill',
    age: 18,
}, {
    name: 'Abram',
    age: 31,
}, {
    name: 'Aib',
    age: 25,
}];

// Решение 1. С помощью встроенного метода sort

function sortFunc1 (arr) {
    
    arr.sort((a,b) => {
    // если вернуть отрицательное значение, то метод
    // поставит элемент a перед b в итоговом массиве
        if (a.age < b.age) {
            return -1;
    // если возраст одинаковый, выстроим элементы, сравнив имена
        } else if (a.age === b.age) {
            return (a.name < b.name) ? -1 : 1;  

        } else {
            return 1;
        }
    })

    return arr;
}

console.log(sortFunc1(usersArr));

// Решение 2. С использованием алгоритма быстрой сортировки

function sortFunc2 (arr) {

    if (arr.length < 2) return arr;

    let baseEl = arr[0];

    const left = [];
    const right = [];
    // берется базовый элемент, по которому ведем сравнение элементов
    // по результатам сравнения разбиваем их на два массива
    // в левом - те, что меньше по возрасту или имени при равных возрастах
    for (let i = 1; i < arr.length; i++) {
        if (baseEl.age > arr[i].age) {
            left.push(arr[i]);
        } 
        
        else if (baseEl.age === arr[i].age && baseEl.name.toLowerCase() > arr[i].name.toLowerCase()) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
            }  
        }
        // в двух массивах вызываем сортировку рекурсивно
        // вернем объединенный результат
        return sortFunc2(left).concat(arr[0], sortFunc2(right));
    }

console.log(sortFunc2(usersArr));