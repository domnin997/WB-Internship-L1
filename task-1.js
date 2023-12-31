// Задача 1.
// Напишите функцию, которая проверяет, является ли заданная строка палиндромом.

// Решение 1.

function checkIfPalindrome1 (string) {
    
// Сравним строку с её версией, записанной наоборот.
// Сравнение строк идет посимвольно - получим только нужные символы с помощью диапазонов RegExp.

    let symbolsArr = string.match(/[а-яА-ЯёЁa-zA-Z0-9]/g),
        amendedStr,
        reverseStr;
    
// В строке может не оказаться нужных символов - проведем проверку.
    if (symbolsArr) {

// match + диапазоны вернет массив совпадений - соединим их в строки (одна будет обратной)
// регистр влияет на сравнение, поэтому приведем строки к одному
       amendedStr = symbolsArr.join('').toLowerCase();
       reverseStr = symbolsArr.reverse().join('').toLowerCase();

    } else {
        console.log('Строка не является палиндромом');
        return;
    }
    
    amendedStr === reverseStr ? console.log('Строка является палиндромом') : console.log('Строка не является палиндромом');

}

checkIfPalindrome1 ("казак");

// Решение 2.

// Для больших строк Решение 1 может быть медленным, т.к. идет сравнение всех символов.
// Его можно ускорить с помощью цикла и сравнения символов самой строки от краев.

function checkIfPalindrome2 (string) {
// удалим все нерелевантные символы с помощью исключающего диапазона RegExp
    string = string.toLowerCase().replace(/[^а-яА-ЯёЁa-zA-Z0-9]/g, '');

    let length = string.length;

    for (let i = 0; i < length/2; i++) {
// если найдено несоответствие, прервем цикл, т.к. дальнейшие вычисления не имеют смысла       
        if (string[i] !== string[length - 1 - i]) {
            console.log('Строка не является палиндромом');
            return;
        }

    }
    console.log('Строка является палиндромом');
}

checkIfPalindrome2('  4, 00 , 4');