// Задача 18.

// Подсчитать максимальный объем данных, который
// можно записать в localStorage вашего браузера.

// let _lsTotal = 0,
//     _xLen,
//     _x;

// function getTotal () {
//     for (_x in localStorage) {
//         if (!localStorage.hasOwnProperty(_x)) {
//             continue;
//         }
//         _xLen = ((localStorage[_x].length + _x.length) * 2);
//         _lsTotal += _xLen;
//         console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
//     };
    
//     console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
// }

for (var i = 0, data = "m"; i < 40; i++) {
    try { 
        localStorage.setItem("DATA", data);
        data = data + data;
    } catch(e) {
        var storageSize = Math.round(JSON.stringify(localStorage).length / 1024);
        console.log("LIMIT REACHED: (" + i + ") " + storageSize + "K");
        console.log(e);
        break;
    }
}
localStorage.removeItem("DATA");



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