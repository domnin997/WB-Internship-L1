// Задача 15.

// Напишите асинхронную функцию, которая использует ключевое слово
// await для ожидания выполнения других асинхронных операций,
// и возвращает результат выполнения.

function timeOut (ms) {
    return new Promise (resolve => setTimeout(resolve, ms));
}

async function asyncFunc () {
    await timeOut(3000);
    
    console.log('Выполнено');
}

asyncFunc();