export function Exercise4 () {
    const ages = [33, 12, , 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
    const [first, second, third = 0, ...restAges] = ages;

    const sum = (...nums) => restAges.reduce((acc, age) => acc + age, 0);

    const oddAges = (...nums) => restAges.filter(age => age % 2 !== 0); // là một arrow function trả về một mảng với tham số đầu vào là các biến hàm

    const oddAges2 = restAges.filter(age => age % 2 !== 0); //là một biến mảng với các phần tử là các số lẻ trong mảng restAges
    return(
        <>
        <p>Array:</p>
        <ul>
            {ages.map((age, index) => (
                <li key={index}>Index {index + 1}: {age}</li>
            ))}
        </ul>
        <p>First: {first}</p>
        <p>Second: {second}</p>
        <p>Third: {third}</p>
        <p>RestAges: {restAges.join(", ")}</p>
        </>
    )
}