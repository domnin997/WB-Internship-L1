// Задача 2.
// Напишите функцию, которая принимает число и возвращает true, если это число является странным,
// и false в противном случае. Странное число - то, которое равно сумме всех своих делителей, кроме себя.

// Решение

function checkIfStrange (num) {
    
    const dividers = [1],
          total = 0;

    for (let i = 2; i <= num/2; i++) {
        
        if (num%i === 0) {
            
            dividers.push(i);
            
            if (i*i === num) {
                dividers.push(num/2);
                break;
            }
        }
    }

    dividers.forEach((num) => {
        total+=num;
    })
    
    total === num ? true : false;
}