// Задача 12.

// Создайте объект, представляющий собой книгу.
// Объект должен иметь свойства, такие как: название книги, автор и год издания.
// Напишите методы для получения и изменения значений свойств книги.

// Решение 1. С помощью методов.

const book_1 = {

    title: 'Sapiens',
    author: 'Noah Harari',
    publisedAt: 2011,
    
// Для работы со свойствами объектов в функции-методе
// используем ключевое слово this - контекст вызова.
// При вызове обычной функции в качестве метода
// это слово будет указывать на объект, которому принадлежит метод.

    setTitle (newTitle) {
        this.title = newTitle; // Обратимся к свойству title этого объекта и присвоим новое значение.
    },

    getTitle () {
        return this.title; // Аналогично с чтением.
    },

    setAuthor (newAuthor) {
        this.author = newAuthor;
    },

    getAuthor () {
        return this.author;
    },

    setDate (newDate) {
        this.publisedAt = newDate;
    },

    getDate () {
        return this.publisedAt;
    },

}

// Ниже пример использования и выведение результатов в консоль.

console.log(book_1.getTitle());
book_1.setTitle('Vanity Fair'); 
console.log(book_1.getTitle());

// Решение 2. С помощью свойств-аксессоров - set / get.

const book_2 = {

    title: 'Sapiens',
    author: 'Noah Harari',
    publisedAt: 2011,
    
    // Свойства-аксессоры записываются с ключевыми словами get / set.
    // В отличие от методов они вызываются как обычные свойства (без ()).
    // Для обращения к свойствам объекта внутри get и set также используем this.

    get bookTitle() {
        return (this.title);
    },

    set bookTitle(value) {
        this.title = value;
    },

    get bookAuthor() {
        return (this.author);
    },

    set bookAuthor(value) {
        this.author = value;
    },

    get bookPublished() {
        return (this.publisedAt);
    },

    set bookPublished(value) {
        this.publisedAt = value;
    },
}