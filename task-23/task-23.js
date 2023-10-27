// Задача 23

// Анализатор сложности пароля

const passTips = document.querySelector('.password-tips'),
      passLvl = document.querySelector('.password-level'),
      passInput = document.querySelector('.password-input');

// создадим функцию-обработчик для ввода информации в input
function validatePass () {
// функция calcPassStrength вернет массив недостатков и рекомендаций, полученных при проверке на каждый критерий
    const defects = calcPassStrength(passInput.value);
// установим максимальное число баллов надежности пароля - 100
// недостатки будут снижать итоговый балл
    let strength = 100;

// при каждом вызове очистим поле подсказок, чтобы вписать туда актуальные
    passTips.innerHTML = '';

    defects.forEach((defect) => {
        if (!defect) {return};
// при наличии недостатка снизим итоговый балл и запишем рекомендацию в блок
        strength -= defect.decrease;
        const message = document.createElement('li');
              message.innerHTML = defect.message;
              passTips.append(message);
    })

// Покажем пользователю надежность на основании балла
    if (strength <= 50) {
        passLvl.innerText = `Ненадежный пароль. Безопасность: ${strength}%`;
    } else if (50 < strength && strength < 100) {
        passLvl.innerText = `Средний пароль. Безопасность: ${strength}%`;
    } else {
        passLvl.innerText = `Надежный пароль. Безопасность: ${strength}%`;
    }

    // В зависимости от надежности пароля будем менять цвет
    // border input в состоянии фокуса (зеленый, желтый, красный)
    toggleColor(strength);
}

// проверим пароль по критериям, вернем массив недостатков и рекомендаций
function calcPassStrength (pass) {
    const defects = [];
    defects.push(checkLength(pass));
    defects.push(checkLowerCase(pass));
    defects.push(checkUpperCase(pass));
    defects.push(checkNums(pass));
    defects.push(checkSymbols(pass));
    return defects;
}

function checkLength (pass) {
    
    if (pass.length <= 8) {
        return {
            message: 'Используйте более 8 символов.',
            decrease: 60,
        }
    }
}

// создадим единую функцию для: регистра, чисел и символов
function checkCharacters (pass, regex, type) {
    const result = pass.match(regex) || []; // match вернет массив совпадений

    if (result.length === 0) {
        return {
            message: `Пароль не содержит ${type}`,
            decrease: 10,
        }
    }

    if (result.length < 2) {
        return {
            message: `Рекомендуем использовать от двух ${type}`,
            decrease: 5,
        }
    }
}

// используем единую функцию, передав нужные аргументы
function checkNums (pass) {
    return checkCharacters (pass, /[0-9]/g, 'цифр'); // RegEx диапазон 0-9 для поиска чисел
}

function checkUpperCase (pass) {
    return checkCharacters (pass, /[A-ZА-ЯЁ]/g, 'больших букв'); // RegEx диапазон для поиска больших букв
}

function checkLowerCase (pass) {
    return checkCharacters (pass, /[a-zа-яё]/g, 'маленьких букв'); // RegEx диапазон для поиска маленьких букв
}

function checkSymbols (pass) {
    return checkCharacters (pass, /[^a-zа-яёA-ZА-ЯЁ0-9\s]/g, 'символов'); // RegEx диапазон для поиска символов
}

function toggleColor (score) {
    if (score === 100) {
        passInput.classList.remove('weak','medium');
        passInput.classList.add('good');
    } else if (50 < score && score <= 99) {
        passInput.classList.remove('good','weak');
        passInput.classList.add('medium');
    } else {
        passInput.classList.remove('good','medium');
        passInput.classList.add('weak');
    }
}

passInput.addEventListener('input',  validatePass);