const itemsList = document.querySelector('.posts-list-container'),
      body = document.querySelector('body');

let offset = 10;
let firstUpdCall = true;

// функция подсчета занятого места и итогового размера LS

function occupiedAndAvailableLS () {
// принцип как в задаче 18, но также добавим проверку занятого сейчас места
// для этого весь LS переведем в строку (формат JSON), и на основе её длины рассчитаем объем занятого места
    let currStored = Math.round((JSON.stringify(localStorage).length/1024)*2);
    console.log(`Занято ${currStored} килобайт`);

// Далее как в задаче 18.
    let testValue = 'A'.repeat(100000);
    for (let i = 0, total = testValue; ; i++) {
        try {
            localStorage.setItem('test-item', total);
            total = total + testValue;
        } catch (e) {
            const valueStored = Math.round((localStorage['test-item'].length*2)/1024);
                console.log('Всего размер хранилища ' + valueStored + ' килобайт');
                
                localStorage.removeItem('test-item');
                
                break;
        }
    }
}

// чтобы не вызывать функцию на каждый добавленный элемент (вычисления занимают время),
// будем вызывать её далее по коду только после того, как уже добавлены все элементы одного обновления

// PS так как оценка итогового размера основана на добавлении 100 000 букв,
// при добавлении в LS постов оценка итога может меняться, т.к. ошибка quota будет выбрасываться раньше


function updScript () {
    document.querySelector('script').remove();
    let script = document.createElement('SCRIPT');
    script.src = `https://api.vk.com/method/wall.get?owner_id=-15755094&domain=ria&offset=${offset}&count=10&access_token=21e2edca21e2edca21e2edcaed22f4ed37221e221e2edca44d2eb64da388c98e9eba618&v=5.154&callback=callbackFunc`;
    document.getElementsByTagName("head")[0].appendChild(script);
    
    offset+=10;
}

function handleScroll () {
    if (itemsList.scrollHeight - itemsList.scrollTop < 450) {
        updScript();
    }
}

function throttle(callee, timeout) {
    let timer = null
  
    return function perform(...args) {
      if (timer) return
  
      timer = setTimeout(() => {
        callee(...args)
  
        clearTimeout(timer)
        timer = null
      }, timeout)
    }
}

const throtlledF = throttle(handleScroll, 250);

itemsList.addEventListener('scroll', throtlledF)

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

    let img;
    if (item.attachments[0].photo) {
        img = item.attachments[0].photo.sizes[0].url;
    } else if (item.attachments[0].link) {
        img = item.attachments[0].link.photo.sizes[0].url;
    }
    return img;
}

function setToLS (item, index, img, date) {

    localStorage.setItem(`item${(offset-10)+index}`, JSON.stringify({
        img: img,
        text: item.text,
        likes: item.likes.count,
        comments: item.comments.count,
        dateNum: item.date,
        date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
        time: `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes()+'0'}`}))

}

const callbackFunc = (resp) => {

    if (localStorage.length === 0) {
        
        resp.response.items.forEach((item, index) => {
            
            let date = new Date(item.date*1000);
            let img = getImg(item);
            setToLS(item, index, img, date);
            
     
            appendItem (img, item.text,
                       item.likes.count,
                       `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
                       `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes()+'0'}`,
                       item.comments.count)

    });
    occupiedAndAvailableLS ();
    firstUpdCall = false;
    
    } else {


    if (firstUpdCall) {

        let posts = [];

        for (let i = 0; i < localStorage.length; i++) {
            
            let key = localStorage.key(i);
            let itemContent = localStorage.getItem(key);
            let objCont = JSON.parse(itemContent);

            posts.push(objCont);

            offset+=1;   
        }

        posts.sort((a, b) => {return b.dateNum - a.dateNum})

        resp.response.items.forEach((item, index) => {
 
            if (item.date > posts[0].dateNum) {
                
                let date = new Date(item.date*1000);
                let img = getImg(item);
                setToLS(item, index, img, date);
                

            posts.unshift({
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

        occupiedAndAvailableLS ();

        posts.forEach((post) => {
            appendItem (post.img, post.text, post.likes, post.date, post.time, post.comments);
        })

        firstUpdCall = false;
    }

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
        occupiedAndAvailableLS ();
    }
}
}