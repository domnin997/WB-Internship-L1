// Задача 28

// Напишите функцию, которая создает новый элемент с использованием шаблонов
// (например, с помощью тега <template>) и добавляет его в DOM.

function setCard (name, country) {
    // Получим контейнер и шаблон (не отображается)
    const cardCont = document.querySelector('.cards-container'),
          template = document.querySelector('.product-card');

    // Клонируем содержимое шаблона в переменную 
    const cardClone = template.content.cloneNode(true);

    // Получим все параграфы из карты, чтобы динамически вписать информацию
    const paras = cardClone.querySelectorAll('p');
          paras[0].innerText = `${name}`;
          paras[1].innerText = `Страна: ${country}`;

    // Записываем информацию, которая пришла в функцию и добавляем итог в контейнер
    cardCont.append(cardClone);
}

setCard('Шариковая ручка', 'Россия');
setCard('iPhone 13', 'США');