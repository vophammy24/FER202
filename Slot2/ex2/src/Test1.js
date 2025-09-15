let numbers = [1, 2, 3, 4, 5];

numbers.map(num => {
	console.log(num * num);
});

numbers.filter(num => num % 2 === 0).forEach(num => console.log(num));


let people = [
    {ID: 1, name: "Alice", age: 30},
    {ID: 2, name: "Bob", age: 20},
    {ID: 3, name: "Charlie", age: 35}
];

let namesOver20 = people.reduce((acc, person) => {
    if (person.age > 20) acc.push(person.name);
    return acc;
}, []);
console.log(namesOver20);


