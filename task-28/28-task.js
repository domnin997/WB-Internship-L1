function setCard (name, country) {
    const cardCont = document.querySelector('.cards-container');
    const template = document.querySelector('.product-card');

// Клонируем содержимое шаблона в переменную 
    let cardClone = template.content.cloneNode(true);

// Получим все параграфы из карты, чтобы динамически вписать информацию
    let paras = cardClone.querySelectorAll('p');
    paras[0].textContent = `${name}`;
    paras[1].textContent = `Страна: ${country}`;

// Записываем информацию, которая пришла в функцию и добавляем итог в контейнер
    cardCont.append(cardClone);
}


setCard('Шариковая ручка', 'Россия');
setCard('iPhone 13', 'США')