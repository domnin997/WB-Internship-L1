// Задча 16

// Напишите модуль, который экспортирует функцию для работы
// с датами. Внутри модуля используйте внешнюю библиотеку Moment.js

// Решение

import moment from "moment/moment.js";
// импортируем moment из модуля
export default function useMoment () {
// экспортируем по умолчанию функцию для работы с датами
    function getCurrentData () {
        let now = moment();
        moment.locale('ru');
        return now.format('dddd, MMMM DD YYYY, h:mm:ss');
    }
// функция будет возвращать функцию для получения текущей даты
    return getCurrentData;
    
// можно также экспортировать и всю библиотеку moment
}