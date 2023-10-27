const itemsList = document.querySelector('.posts-list-container'),
      body = document.querySelector('body');

let offset = 10;
let firstUpdCall = true;

// firstUpdCall влияет на то, извлекаем ли мы данные из LS для отрисовки
// или же они уже были отрисованы, и мы добавляем новые из ответа от VK

// для избежания блокировок запросов по CORS используем JSONP
// для обновления данных и догрузки нам нужно будет менять элемент script на странице
function updScript () {
    document.querySelector('script').remove();
    
    let script = document.createElement('SCRIPT');
        script.src = `https://api.vk.com/method/wall.get?owner_id=-15755094&domain=ria&offset=${offset}&count=10&access_token=21e2edca21e2edca21e2edcaed22f4ed37221e221e2edca44d2eb64da388c98e9eba618&v=5.154&callback=callbackFunc`;
    
    document.getElementsByTagName("head")[0].appendChild(script);
    
    offset+=10;
}

// при приближении к концу списка будем вызывать обновление листа
function handleScroll () {
    if (itemsList.scrollHeight - itemsList.scrollTop < 450) {
        updScript();
    }
}

// обновление при прокрутке следует вызывать один раз в определенный промежуток времени
// в противном случае будет направлена серия запросов. Для этого используем функцию throttle
function throttle(callee, timeout) {
    let timer = null
  
    return function innerFunc(...args) {
        if (timer) return
  
        timer = setTimeout(() => {
            callee(...args);
            clearTimeout(timer);
            timer = null;
      }, timeout)

    }
}

// обернем обработчик прокрутки в throttle и зададим интервал в 250 миллисекунд
const throtlledScrollHandler = throttle(handleScroll, 250);

itemsList.addEventListener('scroll', throtlledScrollHandler);

// функция добавления элемента в список на основании полученных данных
function appendItem  (img, text, likes, date, time, comments) {
    let newItem = document.createElement('li');
        newItem.classList.add('posts-list__item');
        newItem.innerHTML = `
            <div class="img-text-wrap">
                <div class="item__img-cont">
                    <img class="img"
                        src="${img}"
                        alt="Error">
                </div>
                <div class="item__text-cont">
                    <p class="item__text">
                        ${text}
                    </p>
                </div>
            </div>
            <div class="item__likes-comments">
                <div class="item__likes-cont">
                    <img class="like-icon"
                        src="./icons/like_icon.png"
                        alt="fav-icon">
                    <p>${likes}</p>
                </div>
                <div class="item__date">
                    <div class="item__date-cont">
                        ${date}
                    </div>
                    <div class="item__time-cont">
                        ${time}
                    </div>
                </div>
                <div class="item__comments-cont">
                    <img class="comment-icon"
                        src="./icons/comment_icon.svg"
                        alt="comment-icon">
                    <p>${comments}</p>
                </div>
            </div>`;

    itemsList.append(newItem);
}

function getImg (item) {
// в разных постах изображения хранятся в разных объектах
// проведем проверку и вернем ссылку
    let img;
    if (item.attachments[0].photo) {
        img = item.attachments[0].photo.sizes[0].url;
    } else if (item.attachments[0].link) {
        img = item.attachments[0].link.photo.sizes[0].url;
    } else if (item.attachments[0].video) {
        img = item.attachments[0].video.image[0].url;
    }
    return img;
}

function setToLS (item, index, img, date) {
// функция запишет в LS объект с данными о посте в формате JSON
// имя ключа установим на основании количества уже загруженных элементов
    // пробуем записать данные в LS, и если он не переполнен, то они будут записаны
    try {
        localStorage.setItem(`item${(offset-10)+index}`, JSON.stringify({
            img: img,
            text: item.text,
            likes: item.likes.count,
            comments: item.comments.count,
            dateNum: item.date,
            dateOfLoad: new Date().getTime(),
            date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
            time: `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes()+'0'}`}))
    } catch (e) {
        // если LS переполнен, будет выброшена ошибка; нужно удалить самый старый пост
        // сравниваем даты загрузки постов, и начнем со сравнения с текущей
        let date = new Date ().getTime();
        // записываем ключи на потенциальное удаление
        let keyToBeDel;
        for (let i = 0; i < localStorage.length; i++) {
            
            let key = localStorage.key(i);
            let itemContent = localStorage.getItem(key);
            let objCont = JSON.parse(itemContent);
            if (objCont.dateOfLoad < date) {
                keyToBeDel = i;
            }
        }
        // удаляем пост, загруженный раньше всех
        localStorage.removeItem(keyToBeDel);
        // пробуем записать новые данные снова
        setToLS (item, index, img, date);
    }
}

const callbackFunc = (resp) => {
// если LS пуст, то пользователь открыл страницу первый раз
// переберем результаты ответа от сервера и сформируем первые 10 постов

// P.S. Могут наблюдаться сбои порядка с закрепленными постами - при первой выгрузке они появляются в начале,
// но время их публикации раньше остальных, и при обновлении с LS они встают по порядку
    if (localStorage.length === 0) {
        
        resp.response.items.forEach((item, index) => {
            
            let date = new Date(item.date*1000);
            let img = getImg(item);
            setToLS(item, index, img, date);
    // сразу запишем полученные данные в LS      
            appendItem (img, item.text,
                       item.likes.count,
                       `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
                       `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes()+'0'}`,
                       item.comments.count)
    // и добавим в виджет
    });
    
    // страница была открыта - переводим значение в false
    firstUpdCall = false;
    
    } else {
    // если в LS есть данные и это первый вызов upd
    // (пользователь вернулся на страницу после закрытия)

    if (firstUpdCall) {
    // используем массив, чтобы сортировать элементы и искать наиболее свежие посты
        let posts = [];

        for (let i = 0; i < localStorage.length; i++) {
            
            let key = localStorage.key(i);
            let itemContent = localStorage.getItem(key);
            let objCont = JSON.parse(itemContent);
        // выгрузим все посты в массив
            posts.push(objCont);

            offset+=1;   
        }
        // отсортируем массив по дате постов, чтобы отобразить их в нужном порядке
        // а также выяснить, есть ли более свежие посты в ответе сервера
        posts.sort((a, b) => {return b.dateNum - a.dateNum})

        resp.response.items.forEach((item, index) => {
        // переберем данные, пришедшие от сервера, и если там есть более свежие посты, 
        // добавим их в LS, а затем в начало массива постов 
            if (item.date > posts[0].dateNum) {
                
                let date = new Date(item.date*1000);
                let img = getImg(item);
                setToLS(item, index, img, date);

            posts.push({
                img: img,
                text: item.text,
                likes: item.likes.count,
                comments: item.comments.count,
                dateNum: item.date,
                date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
                time: `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes()+'0'}`
            });
            }
        })
        // выполним финальную сортировку
        posts.sort((a, b) => {return b.dateNum - a.dateNum})
             .forEach((post) => {
                appendItem (post.img, post.text, post.likes, post.date, post.time, post.comments);
             })

        firstUpdCall = false;
    }

    // если это не первый вызов upd, значит, это дозагрузка по скроллу
    // переберем полученные от сервера данные и запишем в LS
    else if (!firstUpdCall) {
        resp.response.items.forEach((item, index) => {
            let date = new Date(item.date*1000);
            let img = getImg(item);
                setToLS(item, index, img, date);
        appendItem (img, item.text,
                    item.likes.count,
                    `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
                    `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes()+'0'}`,
                    item.comments.count)
            }
        )
    }
}
}