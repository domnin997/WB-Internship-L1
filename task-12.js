// Задача 12.
// Задача на работу с объектами: создайте объект, представляющий собой книгу.
// Объект должен иметь свойства, такие как: название книги, автор и год издания.
// Напишите методы для получения и изменения значений свойств книги.

const book = {

    title: 'Sapiens',
    author: 'Noah Harari',
    publisedAt: 2011,
    
    get bookTitle() {
        return (`The title is ${this.title}`);
    },

    set bookTitle(value) {
        this.title = value;
    }

}

console.log(book.bookTitle, book.bookTitle = 'Matrix', book.bookTitle);