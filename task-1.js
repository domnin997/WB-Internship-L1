// Задача 1.
// Напишите функцию, которая проверяет, является ли заданная строка палиндромом.

// Решение 1.

function checkIfPalindrome1 (string) {
    
// Для решения нужно сравнить строку с её версией, записанной наоборот.
// Сравнение строк идет посимвольно, поэтому удалим нерелевантные символы из строк
// с помощью регулярного выражения, и приведем их к одному регистру.

    let symbolsArr = string.match(/[а-яА-ЯёЁa-zA-Z]/g),
        amendedStr,
        reverseStr;
    
// В строке может не оказаться нужных символов - проведем проверку.

    if (symbolsArr) {
       amendedStr = symbolsArr.join('').toLowerCase();
       reverseStr = symbolsArr.reverse().join('').toLowerCase();

    } else {
        console.log('Строка не является палиндромом');
        return;
    }
    
    amendedStr === reverseStr ? console.log('Строка является палиндромом') : console.log('Строка не является палиндромом');

}

// checkIfPalindrome1 ("казак");

// Решение 2.

// В случае с большими строками Решение 1 может быть медленным, т.к. идет сравнение всех символов.
// Его можно ускорить с помощью цикла и сравнения символов самой строки от краев.

function checkIfPalindrome2 (string) {

    string = string.toLowerCase().replace(/[^а-яА-ЯёЁa-zA-Z]/g, '');

    let length = string.length;

    for (let i = 0; i < length/2; i++) {
        if (string[i] !== string[length - 1 - i]) {
            console.log('Строка не является палиндромом');
            return;
       }
    }
    console.log('Строка является палиндромом');
}

checkIfPalindrome2('аваккпва');