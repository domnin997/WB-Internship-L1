// Задача 26

// Напишите функцию, которая рекурсивно обходит дерево DOM,
// начиная с указанного элемента, и выполняет определенное действие
// с каждым узлом (например, выводит информацию о теге в консоль).

// Решение

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

showEachNode(document.querySelector('body'));