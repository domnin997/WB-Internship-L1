const tableHeader = document.querySelector('.table-header'),
      tableBody = document.querySelector('.table-body'),
      pagesCont = document.querySelector('.pages-container');

let receivedData,
    pagesNum,
    offset = 0,
    number = 50;

function createRows (arr) {
    arr.forEach((el) => {
    const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <th class="table-body__col">${el.fname}</th>
            <th class="table-body__col">${el.lname}</th>
            <th class="table-body__col">${el.tel}</th>
            <th class="table-body__col">${el.address}</th>
            <th class="table-body__col">${el.city}</th>
            <th class="table-body__col">${el.state}</th>
            <th class="table-body__col">${el.zip}</th>
        `;
        tableBody.append(newRow);
    })
}

async function getData () {
    const results = await fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true');
    receivedData = await results.json();
    pagesNum = receivedData.length/50;
}

async function firstLaunch () {
    await getData();
    let newArr = receivedData.slice(offset, number+1);
    createRows(newArr);
    
    for (let i = 1; i <= pagesNum; i++) {
        let newPage = document.createElement('div');
            newPage.innerHTML = `<p class="page-num">${i}</p>`;
            newPage.classList.add('page-num-cont');
            pagesCont.append(newPage);
    }

    document.querySelectorAll('.page-num-cont').forEach((el, index) => {
        el.addEventListener('click', () => {
            updTable(index+1);
        })
    })
}

function updTable (page) {
    number = page*50;
    offset = number - 50;
    let newArr = receivedData.slice(offset, number+1);
    tableBody.innerText = ``;
    createRows(newArr);
}

firstLaunch();