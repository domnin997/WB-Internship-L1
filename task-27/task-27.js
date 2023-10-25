// Задача 27

// Добавить анимацию для элемента: Напишите функцию, которая
// добавляет анимацию для элемента на веб-странице, например,
// плавное изменение его положения или размера.

// Решение 1 - transition и transform

function showBlock() {
    let list = document.querySelector('.list');
    // перемещаем элемент по оси Y и задаем время transition ease-in-out
    // за счет чего он плавно выезжает из-под скрывающего его элемента
    
        list.style.cssText = `
        transition: 3s ease-in-out;    
        transform: translateY(200px);   

    `;
}
// будет вызвана по клику на пульсирующий круг
document.querySelector('.pulsing-circle').addEventListener('click', showBlock);

// Решение 2 - анимация через keyframes

function makePulse() {
    let circle = document.querySelector('.pulsing-circle');
    // назначаем кругу анимацию пульсации, заданную через keyframes в css
    // задаем время анимации, постоянную скорость и бесконечный цикл
    // альтернативное решение - присвоить класс с данной анимацией
    circle.style.cssText = `
        animation: pulse 3s linear infinite;
    `;
}

makePulse();