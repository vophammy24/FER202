export function Exercise5() {
    var people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9}, 
    {name: 'John', age: 40}, 
    {name: 'Ann', age: 19}, 
    {name: 'Elisabeth', age: 16}
    ]
    var teens = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} (${person.age})`);
    
    return (
        <>
        <p>Teenager:</p>
        <ul>
            {teens.map((string, index) => (
                <li key={index}>{string}</li>
            ))}
        </ul>
        </>
    )
}