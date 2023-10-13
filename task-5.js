// Задча 5.
// Функция преобразования JSON с объектами в связный список.

let obj1 = {name: 'Oleg', surname: 'Krutov'},
    obj2 = {name: 'Nikolas', surname: 'Romanov'},
    obj3 = {name: 'Milorad', surname: 'Dodik'},
    obj4 = {name: 'Alexander', surname: 'Vuchich'},
    obj5 = {name: 'Viktor', surname: 'Orban'};

const jsonList = JSON.stringify([obj1, obj2, obj3, obj4, obj5]);

function makeLinkedList (jsonList) {
    
    let outputList = {},
        receivedJSON = JSON.parse(jsonList);

    // Для начала конвертируем список объектов из формата JSON.    

    for (let i = receivedJSON.length - 1; i > 0; i--) {
        receivedJSON[i - 1].next = receivedJSON[i];
            if (i === receivedJSON.length - 1) {
                receivedJSON[i].next = null;
            }
    }
    
    // Затем пеберем полученный массив с конца и запишем в свойство next каждого последующего
    // объекта предыдущий объект. В next последнего объекта запишем null.

    outputList = receivedJSON[0];
    console.log(outputList);
    return outputList;

}

makeLinkedList(jsonList);