const inputField = document.querySelector('.input__field'),
      resultsList = document.querySelector('.input__results-container'),
      selectList = document.querySelector('.input__results-list'),
      currentAddr = document.querySelector('.curr-addr');

// используем настройки запроса, предлагаемые сервисом ДаДата
const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const token = "f6261f0b9e32a27a7c6279374b7811082f97802e";
let query = "";

const options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    // будем обновлять query и значение body срабатывании обработчика input
    body: JSON.stringify({query: query})
}

// данная функция будет вызываться при срабатывании 
// обработчика input и получении данных от сервера
function makeList (result) {
    selectList.innerHTML = ''; // очистим список предыдущего поиска
    result.forEach((address) => {
        // переберем полученные адреса и создадим для каждого значения элемент списка
        let listItem = document.createElement('li');
            listItem.classList.add('input__results-item');
            listItem.innerText = address.value;
        // в случае клика переместим адрес в блок "Выбран"; очистим список и поле input
            listItem.addEventListener('click', () => {
                currentAddr.innerText = listItem.innerText;
                selectList.innerHTML = ' ';
                inputField.value = ' ';
        })

        selectList.append(listItem);
    }); 
}
// создадим функцию debounce, которая будет откладывать
// вызов обработчика события input на 0,2 секунды

function debounce (func, timeout) {

    return function () {
// в переменной prevCall будет храниться время прошлого вызова
// а в currCall - текущего  
        let prevCall = this.currCall;
        this.currCall = Date.now();

// если промежуток между вводами меньше, чем наш интервал
// то очищаем таймаут и отодвигаем вызов на очередной интервал   
        if (prevCall && this.currCall - prevCall <= timeout) {
            clearTimeout(this.callTimer);
        }

        this.callTimer = setTimeout(() => func(), timeout);
    }
}

function handleInput () {
// обновим настройки запроса данными из input  
    query = `${inputField.value}`;
    options.body = JSON.stringify({query: query});
    resultsList.classList.remove('hidden');

// направим запрос с обновленными настройками
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
        // после получения данных сразу вызываем функцию, создающую выпадающий список
            makeList(result.suggestions);
        })
        .catch(error => console.log("error", error));
}

// обернем обработчик в функцию, откладывающую его срабатывание на 0,2 секунды
const debouncedHandler = debounce (handleInput, 200);
inputField.addEventListener('input', debouncedHandler);