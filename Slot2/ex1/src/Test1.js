let add = (a, b) => a + b;
console.log(add(2,3));

let greet = (name, timeofDay) => {
    console.log(`Good ${timeofDay}, ${name}!`);
}
greet("Alice", "morning");
greet("Bob", "evening");

let square = num => {
    return num * num;
}
console.log(square(5));
console.log(square(8));

let sayHello = () => {
    console.log("Hello three!");
}
sayHello();

let person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};
person.greet();
