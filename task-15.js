// Задача 15.

// Напишите асинхронную функцию, которая использует ключевое слово await
// для ожидания выполнения других асинхронных операций, и возвращает результат выполнения.

// Решение 

// используем async для создания асинхронной функции
async function asyncFunc () {
    try {
// используем await для ожидания завершения запроса на сервер
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        if (!response.ok) {
            throw new Error (`Загрузка невозможна, status: ${response.status}`);
        }
// используем await и дождемся выполнения асинхронной операции .json() - декодирование ответа
        const data = await response.json();
// вернем полученную информацию
        return data;
    
    } catch (e) {
        throw e;
    }
}

// далее идет асинхронная функция для тестирования основной
async function useData () {
    let a = await asyncFunc();
    console.log(a);
}

useData();