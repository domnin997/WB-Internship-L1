// Задача 29

// Напишите функцию, которая получает данные из формы на веб-странице
// и выполняет определенные действия с этими данными, например, отправляет их
// на сервер или отображает всплывающее окно с результатами.

function manageInput () {
    const form = document.querySelector('.form');
    // создадим экземпляр FormData и передадим туда форму со страницы
    const data = new FormData(form);
    // FormData будет хранить данные из формы в формате ключ - значение
    const userInfo = [];
    // переберем введенные данные из FormData и запишем в массив
        for (let [key, value] of data) {
            userInfo.push(value);
        }
    // создадим блок с результатами и отобразим на странице 
    const infoWindow = document.createElement('div');
          infoWindow.classList.add('info-window');
          infoWindow.innerText= `Спасибо! Вы ввели: имя - ${userInfo[0]}, фамилия - ${userInfo[1]}`;
    
    document.querySelector('body').append(infoWindow);
}

document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
        manageInput();
});