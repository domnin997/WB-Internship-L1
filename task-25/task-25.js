// Задача 25

// Создать и добавить стиль для элемента: Напишите функцию, которая создает
// новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.

// Решение 1 - применение инлайн стилей

function addStyledEl1 () {
    const newEl = document.createElement('div');
    // запишем инлайн стили
    newEl.style.cssText = `
        width: 100px;
        height: 100px;
        background-color: rgb(55, 115, 205);
        font-weight: 600;
        color: white;
    `;
    
    newEl.innerHTML = 'Это квадрат.';

    document.querySelector('section').append(newEl); // добавляем элемент в конец section.
}

addStyledEl1();


// Решение 2 - стилизация через классы

function addStyledEl2 () {
    const newEl = document.createElement('div');
    
    // Добавим элементу класс, а правила стилизации запишем в файле CSS.
    newEl.classList.add('styled_square');

    newEl.innerHTML = 'Это тоже квадрат.';

    document.querySelector('section').append(newEl); // добавляем элемент в конец section.
}

addStyledEl2();