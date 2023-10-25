// Задача 3.

// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// (1) вычисление N-го числа в ряду Фибоначчи; (2) вычисление всех чисел в ряду Фибоначчи до числа N;
// (3) вычисление N-го просто числа; (4) вычисление всех простых чисел до числа N

// Решение

const MathX = {
// каждое число Фибоначчи после 0 и 1 представляет собой сумму двух предыдущих,
// поэтому для их вычисления можно использовать рекурсию
    getNFib: function (n) {
        const cache = new Map();

// чтобы избежать повторных вычислений при рекурсивном вызове innerFunc,
// при вызове метода создадим map для хранения результатов вызова innerFunc

        const innerFunc = (num) => {
// если функция вызывалась с указанным num, результат будет взят из map
// это ускорит работу, сократив итоговое количество вызовов
            if (cache.has(num)) {
                return cache.get(num);
            
            } else if (num == 0) {
                return 0;
// первое число в ряду = 0, а два последующих = 1 - для таких вызовов вернем результат сразу,
// а для остальных используем рекурсивные вызовы с записью результата в кэш 
            } else if (num <= 3) {
                return 1;
            
            } else {
                const resultInner = innerFunc(num - 1) + innerFunc(num - 2);
                cache.set(num, resultInner);
                return resultInner;
            }
        }
    
        return innerFunc(n);
    },

// для вывода всех чисел Фибоначчи до N используем тот же принцип
// но вернем массив полученных значений

    getFibSeq: function (n) {
        const cache = new Map();
    
        const innerFunc = (num) => {
            if (cache.has(num)) {
                return cache.get(num);
            } else if (num == 0) {
                return 0;
            } else if (num <= 3) {
                return 1;
            } else {
                const resultInner = innerFunc(num - 1) + innerFunc(num - 2);
                cache.set(num, resultInner);
                
                return resultInner;
            }
        }
    
        innerFunc(n);
        return Array.from(cache.values());
    },

    getNPrime: function (n) {
    // в области видимости метода создадим переменные, с которыми будем работать
    // из внутренней функции благодаря замыканию
        let curr = 1; // переменная для текущего анализируемого числа
        let counter = 0; // переменная для номера вычисленного простого числа
        let primes = []; // массив вычисленных простых чисел
        
        function innerFunc(num) {
    // пока номер последнего вычисленного простого числа < искомого
    // будем увеличивать анализируемое число на 1 и проверять его на принадлежность к простым
            while (counter < num) {
                curr++;
                let prime = true;
    
                for (let i = 2; i < curr; i++) {
    // если число делится на какое-либо иное, кроме себя, то оно не простое
    
                    if (curr % i === 0) {
                        prime = false;
                        break;
                    }
                }
    // в противном случае запишем найденное простое число в массив

                if (prime === true) {
                    primes.push(curr);
                    counter++;
                }
            }
           
            return primes[n - 1];
        }
        return innerFunc(n);
    },

    getPrimeSeq: function (n) {
    // используем тот же алгоритм, но вернем уже все вычисленные значения 
        let curr = 1;
        let counter = 0;
        let primes = [];
        
        function innerFunc(num) {
            
            while (counter < num) {
              curr++;
              let prime = true;
              for (var i = 2; i < curr; i++) {
                if (curr % i === 0) {
                  prime = false;
                  break;
                }
              }
              if (prime === true) {
                primes.push(curr);
                counter++;
              }
            }
            
            return primes[n - 1];
        }
        
        innerFunc(n);
        return primes.slice(0, counter);
    },
}

console.log(MathX.getNFib(90));
console.log(MathX.getNPrime(8));
