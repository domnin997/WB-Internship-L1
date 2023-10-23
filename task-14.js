// Задача 14.

// Напишите функцию, которая принимает URL изображения и возвращает промис,
// который разрешается с данными об изображении, когда оно загружено.

const picReq = new Promise ( function(resolve, reject) {
    let res = fetch('https://images.unsplash.com/photo-1553531384-cc64ac80f931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80');
    resolve(res);
}).then((result) => {
    console.log(result)
}).catch(() => {
    console.log('Не вышло');
}
)
// нужно, чтобы параметром был адрес 
// сама функция должна вернуть промис, который уже будет разрешаться
async function getImage () {
    const response = await fetch('https://images.unsplash.com/photo-1553531384-cc64ac80f931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80');
    let res = await response.json();
    console.log(res);
}

getImage ();