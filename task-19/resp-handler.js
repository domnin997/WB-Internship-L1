const itemsList = document.querySelector('.posts-list-container');

function handleResp (resp) {
    resp.items.forEach(item => {
        let newItem = document.createElement('li');
            newItem.classList.add('posts-list__item');
            newItem.innerHTML = `
            <div class="img-text-wrap">
                <div class="item__img-cont">
                    <img src=""
                        alt="">
                </div>
                <div class="item__text-cont">
                    <p class="item__text">
                        ${item.attachments.links.title}
                    </p>
                </div>
            </div>
            `;
            itemsList.append(newItem);
    });
}

export const handleResponse = handleResp;