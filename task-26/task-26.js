// Задача 26

// Напишите функцию, которая рекурсивно обходит дерево DOM,
// начиная с указанного элемента, и выполняет определенное действие
// с каждым узлом (например, выводит информацию о теге в консоль).

// Решение 1 - обход всех узлов (в точности по условию)

function showEachNode (node) {
    // элементы - разновидность узлов, поэтому проверяем, что данный узел - элемент
    if (node instanceof Element) {
        console.log(node.nodeName);
    }
        
    if (node.childNodes.length) {
    // если у узла есть дочерние элементы, вызываем функцию рекурсивно в отношении каждого из них
        for (let i = 0; i < node.childNodes.length; i++) {
            showEachNode(node.childNodes[i]);
        }
    
    }
}

// Решение 2 - обход только элементов

function showAllTags (element) {
    
    console.log(element.tagName);
    
    if (element.children.length) {
        
        for (let i = 0; i < element.children.length; i++) {
            showAllTags(element.children[i]);
        }
    
    }
}

showEachNode(document.querySelector('body'));
// showAllTags(document.querySelector('body'));
