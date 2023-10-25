// Задача 2.

// Напишите функцию, которая принимает число и возвращает true, если это число является странным,
// и false в противном случае. Странное число - равно сумме всех своих делителей, кроме себя.

// Решение

function checkIfPerfect (num) {
    
    let dividers = [1],
        total = 0;

// переберем все делители числа, начиная с 2 до половины числа -
// после половины делителем будет только само число
    for (let i = 2; i <= num/2; i++) {
        
        if (num%i === 0) {
// если число без остатка делится на i, то i - делитель; запишем его в массив
            dividers.push(i);
            
        }
    }
// сложим все числа полученного массива и сравним с самим числом
    total = dividers.reduce((currSum, num) => {
        return currSum + num
    }, 0);

    return total === num ? true : false;
  
}

console.log(checkIfPerfect(81));
console.log(checkIfPerfect(496));