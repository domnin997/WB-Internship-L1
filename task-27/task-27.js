// Задача 27

// Напишите функцию, которая добавляет анимацию для элемента на веб-странице,
// например, плавное изменение его положения или размера.

// Решение 1. Transition и transform

function showBlock() {
    // перемещаем элемент по оси Y и задаем время transition 3s + ease-in-out
    // за счет чего он плавно выезжает из-под скрывающего его элемента
    const list = document.querySelector('.list');
          list.style.cssText = `
              transition: 3s ease-in-out;    
              transform: translateY(200px);
          `;
}
// будет вызвана по клику на пульсирующий круг
document.querySelector('.pulsing-circle').addEventListener('click', showBlock);

// Решение 2. Анимация через keyframes

function makePulse() {
    // назначаем кругу анимацию пульсации, заданную через keyframes в css
    // задаем время анимации, постоянную скорость и бесконечный цикл
    const circle = document.querySelector('.pulsing-circle');
          circle.style.cssText = `
            animation: pulse 3s linear infinite;
          `;
}
// альтернативное решение - присвоить класс с данной анимацией
makePulse();