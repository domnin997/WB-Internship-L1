// Задание 13.

// Создайте базовый класс Shape (фигура), который имеет методы для
// расчета площади и периметра. Затем создайте подклассы, представляющие 
// различные фигуры, такие как прямоугольник, круг и треугольник.
// Реализуйте методы расчета площади и периметра для каждой фигуры.

// создадим базовый класс, который будет квадратом
class Shape {
// при создании экземпляра класса (нового объекта) конструктор присвоит ему свойство sideA,
// равное переданному аргументу. this указывает на новый объект. 
    constructor (sideA) {
        this.sideA = sideA;
    }
// создадим методы, которые будут записаны в Shape.prototype
// при вызове их из созданного объекта они будут взяты из прототипа
// this при вызове же будет ссылаться на sideA объекта
    getArea () {
        return this.sideA*this.sideA;
    }

    getPerimeter () {
        return this.sideA*4;
    }
}

class Rectangle extends Shape {
// через ключевое слово extends новый класс наследует от Shape

    constructor (sideA, sideB) {
// создаем для этого класса свой конструктор, но также вызываем родительский через
// ключевое слово super. Передадим аргументом сторону, и он запишет её в новый объект. 
        super(sideA);
        this.sideB = sideB;
    }
// переопределяем методы, так как для этой фигуры они свои
    getArea () {
        return this.sideA*this.sideB;
    }

    getPerimeter () {
        return this.sideA+this.sideB*2;
    }
}

class Triangle extends Shape {
// аналогичный принцип 
    constructor (sideA, sideB, sideC, height) {
        super(sideA);
        this.sideB = sideB;
        this.sideC = sideC;
        this.height = height;
    }
// переопределяем методы, так как для этой фигуры они свои
    getArea () {
        return this.sideA*this.height/2;
    }

    getPerimeter () {
        return this.sideA + this.sideB + this.sideC;
    }
}

class Circle extends Shape {
    
    constructor (radius) {

        super();
        this.radius = radius;
        this.piNum = 3.14159265359;
    }

// переопределяем методы, так как для этой фигуры они свои
    getArea () {
        return this.piNum*(this.radius*this.radius);
    }

    getPerimeter () {
        return 2*this.piNum*this.radius;
    }
}
