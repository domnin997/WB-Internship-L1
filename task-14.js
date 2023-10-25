// Задача 14.

// Напишите функцию, которая принимает URL изображения и возвращает промис,
// который разрешается с данными об изображении, когда оно загружено.

// Решение

function getImage (url) {
    // направляем запрос по переданному url
    fetch(url)
      .then((response) => {
    // при успешном выполнении промис разрешится с объектом ответа
        if (!response.ok) {
            throw new Error('Ошибка');
        } else {
    // используем ссылку для добавления изображения 
            let img = document.createElement('img');        
            img.src = response.url;
            body.append(img);
        }
      })
}

getImage ('https://images.unsplash.com/photo-1553531384-cc64ac80f931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80');