// Задача 18.

// Подсчитать максимальный объем данных, который
// можно записать в localStorage вашего браузера.

localStorage.clear();
// localStorage.setItem('test-info', 'A'.repeat(10000)); // запишем в LS строку из 10000 А

// чтобы вычислить размер занимаемой памяти, нужно умножить длину строки
// и умножить итог на 2 (т.к. JS использует UTF-16, каждый символ = 2 байта)
// и итоговое число байтов разделить на 1024 (получим Килобайты)

// const valueStored = (JSON.stringify(localStorage).length*2)/1024;

// идея состоит в записи в LS информации до тех пор, пока хранилище не будет переполнено

let pushedValue = 'A'.repeat(100000);

for (let i = 0, total = pushedValue; ; i++) {
    try {
        localStorage.setItem('-test-', total);
        total = total + pushedValue; // после каждой успешной итерации увеличиваем строку
    } catch {
        const valueStored = Math.round((JSON.stringify(localStorage).length*2)/1024);
        console.log('Capacity' + valueStored + 'kB');
        localStorage.removeItem('-test-');
        break;
    }
}

// for (var i = 0, data = "m"; i < 40; i++) {
//     try { 
//         localStorage.setItem("DATA", data);
//         data = data + data;
//     } catch(e) {
//         var storageSize = Math.round((JSON.stringify(localStorage).length / 1024)*2);
//         console.log("LIMIT REACHED: (" + i + ") " + storageSize + "K");
//         console.log(e);
//         break;
//     }
// }
// localStorage.removeItem("DATA");



// if (localStorage && !localStorage.getItem('size')) {
//     var i = 0;
//     try {
//         // Test up to 10 MB
//         for (i = 250; i <= 10000; i += 250) {
//             localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
//         }
//     } catch (e) {
//         localStorage.removeItem('test');
//         localStorage.setItem('size', i - 250);            
//     }
// }