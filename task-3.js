// Задача 3.

const MathX = {
    

}

function getN (n) {

    if (n <= 1) {
        return n;
    } else {
        return fib (n - 1) + fib (n - 2)
    }
}

function memoise (f) {
    const cache = {};
    return function OnBoard (something) { cache[something] || (cache[something] = f(something))};
}

getNFib = memoise(getN);

console.log(MathX.getNFib(15));