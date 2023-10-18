const itemsList = document.querySelector('.posts-list-container'),
      body = document.querySelector('body');


function updScript () {

}

function handleScroll () {
    
}

const callbackFunc = (resp) => {

    resp.response.items.forEach(item => {
        let date = new Date(item.date*1000);
        let img;
        if (item.attachments[0].photo) {
            img = item.attachments[0].photo.sizes[0].url;
        } else if (item.attachments[0].link) {
            img = item.attachments[0].link.photo.sizes[0].url;
        }
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