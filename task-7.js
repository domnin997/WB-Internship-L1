// Задача 7.
// Есть массив функций, напишите код, который вызовет каждую функцию в этом массиве
// и выведет их порядковый номер. Однако, вызов каждой функции должен
// происходить только после вызова предыдущей функции.

let funcArr = [func1, func2, func3];

async function func1 () {
    setTimeout(() => {console.log('This is 1')}, 8000)
}


function func2 () {
    setTimeout(() => {console.log('This is 2')}, 4000)
} 


function func3 () {
    setTimeout(() => {console.log('This is 3')}, 1000)
} 

async function callAll (arr) {
    for (let i = 0; i < arr.length; i++) {
        let wait = new Promise((resolve, reject) => {arr[i]});
        wait.then(console.log(i));
    }
}


function render() {
    return new Promise( ( resolve, reject ) => {
        setTimeout( ()=> {
            console.log( i );
            resolve( 'рузультирующее значение, которое передано дальше' );
        }, 3000 );
    } )
}

    render().then( ( resMessage ) => {
    console.log( resMessage );
    console.log('делаю его активным' );
} );


callAll(funcArr);
// invokeAll();