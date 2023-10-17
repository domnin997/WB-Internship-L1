// Задание 13.

// Создайте базовый класс Shape (фигура), который имеет методы для
// расчета площади и периметра. Затем создайте подклассы, представляющие 
// различные фигуры, такие как прямоугольник, круг и треугольник.
// Реализуйте методы расчета площади и периметра для каждой фигуры.

class Shape {

    constructor (sideA) {
        this.sideA = sideA;
    }

    getArea () {
        return this.sideA*this.sideA;
    }

    getPerimeter () {
        return this.sideA*4;
    }
}

class Rectangle extends Shape {

    constructor (sideA, sideB) {
        super(sideA);
        this.sideB = sideB;
    }
    
    getArea () {
        return this.sideA*this.sideB;
    }
}

class Triangle extends Shape {
    
    constructor (sideA, hight) {
        super(sideA);
        this.hight = hight;
    }

    getArea () {
        return this.sideA*this.hight/2;
    }
}

class Circle extends Shape { // тут должна быть бОльшая сторона.
    
    constructor (radius) {
        this.radius = radius;
        this.piNum = 3.14159265359;
    }

    getArea () {
        return this.piNum*(this.radius*this.radius);
    }
}

const figure = new Shape(5);
const rect = new Rectangle(3, 6);
const trian = new Triangle(4, 6);
console.log(figure.getArea());
console.log(rect.getArea());
console.log(trian.getArea());