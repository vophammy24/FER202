export function Exercise8() {
    const ageEx = [33, 12, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

    const totalAge = (...ages) => ages.reduce((acc, age) => acc + age ,0);

    const minAge1 = (...ages) => {
        let min = Infinity;
        for (let age of ages) {
            if (age < min) min = age;
        }
        return min;
    };

    const maxAge1 = (...ages) => {
        let max = -Infinity;
        for (let age of ages) {
            if (age > max) max = age;
        }
        return max;
    };

    const teenAge = (...ages) => ages.reduce((acc, age) => age >= 13 && age <= 19 ? acc + 1 : acc , 0);

    const adultAge = (...ages) => ages.reduce((acc, age) => age >=20 ? acc + 1: acc , 0); 

    return (
        <>
        <p>Total: <b> {totalAge(...ageEx)} </b> </p>
        <p>Min: <b> {minAge1(...ageEx)} </b> </p>
        <p>Max: <b> {maxAge1(...ageEx)} </b> </p>
        <p>Buckets: {'{'} teen: <b> {teenAge(...ageEx)} </b>, adult: <b> {adultAge(...ageEx)} </b> {'}'}</p>
        </>
    )
}