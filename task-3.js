// Задача 3.

// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// (1) вычисление N-го числа в ряду Фибоначчи; (2) вычисление всех чисел в ряду Фибоначчи до числа N;
// (3) вычисление N-го просто числа; (4) вычисление всех простых чисел до числа N

const MathX = {
    
    getNFib: function (n) {
        const cache = new Map();
    
        const innerFunc = (m) => {
            if (cache.has(m)) {
                return cache.get(m);
            } else if (m <= 0) {
                return 0;
            } else if (m <= 2) {
                return 1;
            } else {
                const resultInner = innerFunc(m - 1) + innerFunc(m - 2);
                cache.set(m, resultInner);
                
                return resultInner;
            }
        }
    
        return innerFunc(n);
    },

    getFibSeq: function (n) {
        const cache = new Map();
    
        const innerFunc = (m) => {
            if (cache.has(m)) {
                return cache.get(m);
            } else if (m <= 0) {
                return 0;
            } else if (m <= 2) {
                return 1;
            } else {
                const resultInner = innerFunc(m - 1) + innerFunc(m - 2);
                cache.set(m, resultInner);
                
                return resultInner;
            }
        }
    
        innerFunc(n);
        return Array.from(cache.values());
    },

    getNPrime: function (n) {
        let curr = 1;
        let counter = 0;
        let primes = [];
        
        function findNthPrime(m) {
            
            while (counter < m) {
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
        return findNthPrime(n);
    },

    getPrimeSeq: function (n) {
        let curr = 1;
        let counter = 0;
        let primes = [];
        
        function findNthPrime(m) {
            
            while (counter < m) {
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
        
        findNthPrime(n);
        return primes.slice(0, counter);
    },
}

console.log(MathX.getNFib(15));
console.log(MathX.getNPrime(67));
console.log(MathX.getPrimeSeq(67));