// Задача 18.

// Подсчитать максимальный объем данных, который
// можно записать в localStorage вашего браузера.

// Решение 
localStorage.clear();

// идея вычисления состоит в том, чтобы увеличивать записаную в LS строку 
// на одинаковое количество символов, пока запись не прекратится из-за переполнения
let testValue = 'A'.repeat(100000);
// будем увеличивать строку на 100 000 символов "А"

for (let i = 0, total = testValue; ; i++) {

    try {
        localStorage.setItem('test-item', total);
        // после каждой успешной итерации увеличиваем строку
        total = total + testValue;

    } catch (e) {

        // JS использует UTF-16 для кодирования строк, следовательно, каждый символ занимает 2 байта
        // вычислим итоговое число символов (длина строки) и разделим на 1024 (получим Килобайты)
        const valueStored = Math.round((localStorage['test-item'].length*2)/1024);
            console.log('Capacity ' + valueStored + ' kB');

        // итог вычисления в моем браузере Chrome - 10156kB
        
            localStorage.removeItem('test-item');
            
            break;
    }
}