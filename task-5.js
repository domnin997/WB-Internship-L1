// Задча 5.

// Функция преобразования JSON с объектами в связный список.

// Решение

// Объекты ниже и их список созданы для демонстрации работы функции

let obj1 = {name: 'Name1', surname: 'Surname1'},
    obj2 = {name: 'Name2', surname: 'Surname2'},
    obj3 = {name: 'Name3', surname: 'Surname3'},
    obj4 = {name: 'Name4', surname: 'Surname4'};

const jsonList = JSON.stringify([obj1, obj2, obj3, obj4]);

function makeLinkedList (jsonList) {
    
    // Для начала конвертируем список объектов из формата JSON.

    let outputList = {},
        receivedJSON = JSON.parse(jsonList);

    // Затем переберем полученный массив с конца и запишем каждый объект
    // в свойство next последующего объекта. В next последнего объекта запишем null.

    for (let i = receivedJSON.length - 1; i > 0; i--) {
        receivedJSON[i - 1].next = receivedJSON[i];
            
        if (i === receivedJSON.length - 1) {
                receivedJSON[i].next = null;
            }
    }

    outputList = receivedJSON[0];

    return outputList;

}

makeLinkedList(jsonList);