// Задача 6.
// Написать функцию сортировки массив объектов по возрастанию возраста.

arra = [{
    name: 'aib',
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
    name: 'Aic',
    age: 25,
}
]

function sortArr (arr) {

    if (arr.length < 2) return arr;

    let baseEl = arr[0];

    const left = [];
    const right = [];

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
        
        return sortArr(left).concat(arr[0], sortArr(right));
    }


let total = sortArr(arra);

console.log(total);
