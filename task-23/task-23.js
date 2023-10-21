const passTips = document.querySelector('.password-tips'),
      passLvl = document.querySelector('.password-level'),
      passInput = document.querySelector('.password-input');

function updStrengthValue () {
    const defects = calcPassStrength(passInput.value);

    let strength = 100;
    
    passTips.innerHTML = '';

    defects.forEach((defect) => {
        if (!defect) {return};

        console.log(defect.decrease);
        strength -= defect.decrease;
        const message = document.createElement('li');
        message.innerHTML = defect.message;
        passTips.append(message);
    })

    if (strength <= 50) {
        passLvl.innerText = 'Ненадежный пароль';
    } else if (50 < strength && strength <= 80) {
        passLvl.innerText = 'Средний пароль';
    } else {
        passLvl.innerText = 'Надежный пароль';
    }
    console.log(strength);
}

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
            decrease: 50,
        }
    }
}

function checkPass (pass) {
    
    if (pass.length < 8) {
        
        passScore.innerText = `Пароль слишком короткий. Используйте не менее 8 символов.`;
    } else {
        
        let digits = /[0-9]/,
            lowerCase = /[a-zа-я]/,
            upperCase = /[A-ZА-Я]/,
            symbols = /[!@#\$%\^&*\(\)\_\-+=\.,:]/;
            
        if (pass.match(digits) && pass.match(lowerCase) && pass.match(upperCase) && pass.match(symbols)) {
            passScore.innerText = `Надежный пароль.`;
        } 
        else if (pass.match(digits) && pass.match(lowerCase) && pass.match(upperCase)) {
            passScore.innerText = `Пароль средней сложности. Добавьте символы, например: ?!*; и т.д.`;
        }
        else if (pass.match(digits) && pass.match(lowerCase) && pass.match(symbols)) {
            passScore.innerText = `Пароль средней сложности. Добавьте большие буквы.`;
        }
        else if (pass.match(lowerCase) && pass.match(upperCase)) {
            passScore.innerText = `Ненадежный пароль. Добавьте цифры и символы.`;
        }
        
        else if ((pass.match(digits) && pass.match(lowerCase)) || pass.match(digits) || pass.match(lowerCase)) {
            passScore.innerText = `Ненадежный пароль.`;
        }
    }
}

function checkNums (pass) {
    return checkCharacters (pass, /[0-9]/g, 'цифр');
}

function checkUpperCase (pass) {
    return checkCharacters (pass, /[A-ZА-ЯЁ]/g, 'больших букв');
}

function checkLowerCase (pass) {
    return checkCharacters (pass, /[a-zа-яё]/g, 'маленьких букв');
}

function checkSymbols (pass) {
    return checkCharacters (pass, /[^a-zа-яёA-ZА-ЯЁ0-9\s]/g, 'символов');
}

function checkCharacters (pass, regex, type) {
    const result = pass.match(regex) || [];

    if (result.length === 0) {
        return {
            message: `Пароль не содержит ${type}`,
            decrease: 20,
        }
    }
}

passInput.addEventListener('input',  updStrengthValue);