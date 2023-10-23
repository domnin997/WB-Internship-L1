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
      
            dividers.push(i);
            
            if (i*i === num) {
                if (num%2===0) {
                    dividers.push(num/2);
                }
                break;
            }
        }
    }
    
    dividers.forEach((num) => {
        total+=num;
    })
    
    return total === num ? true : false;
  
}

console.log(checkIfPerfect(28));
console.log(checkIfPerfect(9));