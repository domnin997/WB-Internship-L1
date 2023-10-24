// Задача 14.

// Напишите функцию, которая принимает URL изображения и возвращает промис,
// который разрешается с данными об изображении, когда оно загружено.

// Решение

function getImgData (url) {
// метод fetch вернёт промис, содержащий объект ответа
    return fetch(url);
}
// нужно, чтобы параметром был адрес 
// сама функция должна вернуть промис, который уже будет разрешаться
async function getImage (url) {
    const response = await fetch(url);
    // let res = await response.json();
    console.log(await response.blob());
}

getImage ('https://images.unsplash.com/photo-1553531384-cc64ac80f931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80');