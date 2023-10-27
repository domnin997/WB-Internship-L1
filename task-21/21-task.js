// Задача 21

// Вычислить размер коллстэка в основных браузерах: Chrome, Firefox,
// Opera и Safari (если есть возможность).

// Решение

// Для вычисления размера callstack будем использовать рекурсивный вызов функции.
// При разном количестве переменных внутри функции максимальное число вызовов также разное,
// следовательно, вызов каждой функции занимает определенное место в callstack
// В памяти находится 1) созданный под функцию контекст исполнения и 2) переменная внутри.

// Chrome: 1) вызов без переменных - 13951 вызов; 2) с одной переменной - 12544; размер callstack - 0,24 МБ.
// Firefox: 1) вызов без переменных - 33443 вызова; 2) с одной переменной - 31239; размер callstack - 0,9 МБ.
// Opera: 1) вызов без переменных - 13950; 2) с одной переменной - 12555; размер callstack - 0,24 МБ.
// Safari: 1) без переменной - 45 633 вызова; 2) с одной переменной 39 929 вызовов; размер callstack примерно - 0,6 МБ.

// Если принять размер всего callstack за x, получим x = 13951*(y*constSize + z),
// где y - это число переменных, constSize - размер одной из них, а z - размер контекста исполнения
// аналогично x = 12544*(y*constSize + z); одна буква по кодировке utf-16 занимает 2 байта памяти, поэтому 
// получим 12544*(1*2 + z) = 13951*(0*2 + z);
// z = 17 байт (примерно)
// следовательно, размер callstack в chrome = 237 167 байт или примерно 0,24 МБ

function calcStackSize () {
    let i = 0;
    
    function inc() {
        let a = 'A';
        i++;
        inc();
    }
    
    try {
        inc();
    }
    
    catch(e) {
        i++;
        console.log(e);
        console.log('Максимальное число вызовов', i);
    }
}

calcStackSize();