const itemsList = document.querySelector('.posts-list-container'),
      body = document.querySelector('body');

let offset = 10;

async function updScript () {
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
    console.log(itemsList.scrollTop, itemsList.scrollHeight);
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

const callbackFunc = (resp) => {

    if (localStorage.length === 0) {
        
        resp.response.items.forEach((item,index) => {
            
            let date = new Date(item.date*1000);
            let img;
            if (item.attachments[0].photo) {
                img = item.attachments[0].photo.sizes[0].url;
            } else if (item.attachments[0].link) {
                img = item.attachments[0].link.photo.sizes[0].url;
            }
            localStorage.setItem(`item${index}`, JSON.stringify({img: img,
                                        text: item.text,
                                        likes: item.likes.count,
                                        comments: item.comments.count,
                                        dateNum: item.date,
                                        date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
                                        time: `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes()+'0'}`}))
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
                    ${item.text}
                </p>
            </div>
        </div>
        <div class="item__likes-comments">
            <div class="item__likes-cont">
                <img class="like-icon"
                     src="./icons/like_icon.png"
                     alt="fav-icon">
                <p>${item.likes.count}</p>
            </div>
            <div class="item__date">
                <div class="item__date-cont">
                    ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}
                </div>
                <div class="item__time-cont">
                    ${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes()+'0'}
                </div>
            </div>
            <div class="item__comments-cont">
                <img class="comment-icon"
                     src="./icons/comment_icon.svg"
                     alt="comment-icon">
                <p>${item.comments.count}</p>
            </div>
        </div>
        `;
        itemsList.append(newItem);
    });
    }

    
}