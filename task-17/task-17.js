const inputField = document.querySelector('.input__field'),
      resultsList = document.querySelector('.input__results-container'),
      selectList = document.querySelector('.input__results-list'),
      currentAddr = document.querySelector('.curr-addr');

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
    body: JSON.stringify({query: query})
}

function makeList (result) {
   selectList.innerHTML = ' ';

    result.forEach((element, index) => {
        // selectList.setAttribute('size', index);
        let option = document.createElement('li');
        option.classList.add('input__results-item');
        option.innerText = element.value;
        option.addEventListener('click', () => {
            currentAddr.innerText = option.innerText;
            selectList.innerHTML = ' ';
            inputField.value = ' ';
        })
        selectList.append(option);
       
    }); 
}


// Есть функция-обработчик события ввода в поле.
// Есть функция, которая отвечает за отправку запроса на список адресов.
// Функцию-запрос нужно обернуть в debounce().

function debounce (func, timeout) {

    return function (...args) {
        
        let prevCall = this.currCall;
        this.currCall = Date.now();

        if (prevCall && this.currCall - prevCall <= timeout) {
            clearTimeout(this.callTimer);
        }

        this.callTimer = setTimeout(() => func(...args), timeout);
    }
}

function handleInput () {
    
    query = `${inputField.value}`;
    options.body = JSON.stringify({query: query});
    resultsList.classList.remove('hidden');
    console.log(`Пошел вызов, время ${Date.now()}`)

    fetch(url, options)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            makeList(result.suggestions);
        })
        .catch(error => console.log("error", error));
}

const debouncedHandler = debounce (handleInput, 200);

inputField.addEventListener('input', debouncedHandler);