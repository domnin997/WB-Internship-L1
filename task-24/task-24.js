// Задача 24

// Разработайте страницу, отображающую таблицу с данными.

const tableHeaders = document.querySelectorAll('.table-header__col'),
      tableBody = document.querySelector('.table-body'),
      pagesCont = document.querySelector('.pages-container');

// создадим переменные для хранения всего массива полученных данных, количества страниц,
// а также переменные для промежутка отображаемых в данный момент строк (offset - начало, number - конец)
let receivedData,
    pagesNum,
    offset = 0,
    number = 50;

// создадим функцию, формирующую одну страницу из передаваемого ей массива
// используем массив данных, чтобы сформировать каждую строку и добавим строки в тело таблицы
function createRows (arr) {
    arr.forEach((el) => {
    const newRow = document.createElement('tr');
          newRow.classList.add('table-body__row');
          newRow.innerHTML = `
              <tb class="table-body__col">${el.fname}</tb>
              <tb class="table-body__col">${el.lname}</tb>
              <tb class="table-body__col">${el.tel}</tb>
              <tb class="table-body__col">${el.address}</tb>
              <tb class="table-body__col">${el.city}</tb>
              <tb class="table-body__col">${el.state}</tb>
              <tb class="table-body__col">${el.zip}</tb>
          `;

          tableBody.append(newRow);
    })
}

tableHeaders.forEach((header, index) => {    
    // каждой ячейке заголовка создадим состояние, отображающее направление сортировки; возрастание по умолчанию
    let ascendSort = true;
        header.addEventListener('click', () => {
    // при клике на ячейку заголовка будем устанавливать ей класс "активно" и снимать с остальных       
            tableHeaders.forEach((header) => {
                header.classList.remove('active');
            });
            header.classList.add('active');
    // в зависимости от текущего состояния переключим его по клику  
            header.classList.toggle('ascend', ascendSort);
            ascendSort = header.classList.contains('ascend') ? false : true;
    // используем индекс ячейки и её состояние для сортировки ячеек в теле
            sortTable(index, ascendSort);
    });
})

// создадим функцию, срабатывающую при открытии страницы
// загрузка данных происходит асинхронно - используем async / await
async function firstPageLoad () {
    // используем await, чтобы дождаться выполнения промиса, который вернет fetch()
    const response = await fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true');
    // промис успешно выполнится даже при ошибках диапазона 400 - 599 - обработаем их через свойство ok
    if (!response.ok) {
        throw new Error(`Error - something went wrong!`);
    }
    // декодируем ответ из формата JSON в заранее созданную переменную
    // метод json() асинхронен - используем await
    receivedData = await response.json();
   
    // из полученной информации сформируем строки первой страницы
    createRows(receivedData.slice(offset, number));
    
    // вычислим итоговое число страниц и создадим навигацию, создав указатели и назначив им обработчики клика
    pagesNum = receivedData.length/50;

    for (let i = 1; i <= pagesNum; i++) {
        let newPage = document.createElement('div');
            newPage.innerHTML = `<p class="page-num">${i}</p>`;
            newPage.classList.add('page-num-cont');
            // первая страница активна по умолчанию
            if (i === 1) {
                newPage.classList.add('active');
            }
            newPage.addEventListener('click', () => {
                
                document.querySelectorAll('.page-num-cont').forEach((pageNum) => {
                    pageNum.classList.remove('active');
                });
                newPage.classList.add('active');
                
                tableHeaders.forEach((header) => {
                    header.classList.remove('active');
                });
                
                updTable(i);
            });
        pagesCont.append(newPage);
    }
}

// функция примет номер страницы, кликнутой в панели навигации и на его основании
// изменит диапазон отображения + сформирует новую страницу с помощью createRows
function updTable (page) {
    number = page*50;
    offset = number - 50;
    let newArr = receivedData.slice(offset, number);
    tableBody.innerText = ``;
    createRows(newArr);
}

function sortTable (column, ascendSort) {
    
    Array.from(document.querySelectorAll('.table-body__row')).sort((a, b) => {
        
        let firstRow = a.querySelectorAll('.table-body__col')[column].textContent.toLowerCase(),
            secondRow = b.querySelectorAll('.table-body__col')[column].textContent.toLowerCase();
        // сравниваем элементы нужной колонки в зависимости от настроек сортировки - убывание/ возрастание
        return ascendSort ? (firstRow < secondRow ? 1 : -1) : (firstRow < secondRow ? -1 : 1);
        // массив сортируется "на месте", поэтому используем результат для формирования обновленного порядка
    }).map(sortedRow => tableBody.append(sortedRow));
}

// загрузка html вызовет запрос на сервер, обработку ответа и отрисовку первой страницы таблицы
firstPageLoad();