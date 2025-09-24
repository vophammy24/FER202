export function Exercise2() {
    const numbers = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 8, 4, 6, 2, 1, 12, 14, 18, 20, 10];
    const names = ["Alice", "Charlie", "Bob", "Frank", "Eve", "Hannah", "Grace", "Ivy", "David", "Jack"];
    const people = [
        { id: 1, name: "Alice", age: 15 },
        { id: 2, name: "Charlie", age: 19 },
        { id: 3, name: "Eve", age: 16 },
        { id: 4, name: "David", age: 18 },
        { id: 5, name: "Grace", age: 28 },
        { id: 6, name: "Frank", age: 17 },
        { id: 7, name: "Ivy", age: 17 },
        { id: 8, name: "Hannah", age: 27 },
        { id: 9, name: "Bob", age: 15 },
        { id: 10, name: "Jack", age: 14 }
    ];
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const teenPeople = people.filter(person => person.age >= 13 && person.age <= 19);
    const avgAge = teenPeople.reduce((acc, person) => acc + person.age, 0) / teenPeople.length;
    return (
        <>
        <p>Danh sách mảng số nguyên</p>
        <ul>
            {numbers.sort((a, b) => a - b).map((number, index) => (
                <li key={index}>{number}</li>
                ))}
        </ul>
        <p>Tổng các phần tử của mảng là: {sum}</p>
        <p>Số lượng phần tử là: {numbers.length}</p>
        <p>Danh sách mảng tên</p>
        <ul>{names.sort().map((name, i) => (
            <li key = {i}>{name}</li>
            ))}
        </ul>
        <p>Danh sách tên của những người trong độ tuổi từ 13 đến 19:</p>
        <ul>
            {teenPeople.map( (person) => (
                <li key={person.id}>{person.name} - {person.age} tuổi</li>
                ))}
        </ul>
        <p>Số lượng người có tuổi từ 13 đến 19 là: {teenPeople.length}</p>
        <p>Trung bình tuổi của người có tuổi từ 13 đến 19 là: {avgAge}</p>

        </>
    )
}