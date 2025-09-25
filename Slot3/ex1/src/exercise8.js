const ageEx = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const totalAge = (...ages) => ages.reduce((acc, age) => acc + age ,0);

const minAge1 = (...ages) => {
    let min = Infinity;
    for (let age of ages) {
        if (age < min) min = age;
    }
    return min;
};

//other way
const minAge2 = (...ages) => Math.min(...ages);

const maxAge1 = (...ages) => {
    let max = -Infinity;
    for (let age of ages) {
        if (age > max) max = age;
    }
    return max;
};

//other way
const maxAge2 = (...ages) => Math.max(...ages);

//count number of ages that are in the teen range (13-19) by reduce
const teenAge = (...ages) => ages.reduce((acc, age) => age >= 13 && age <= 19 ? acc + 1 : acc ,0);

const adultAge = (...ages) => ages.reduce((acc, age) => age >=20 ? acc + 1: acc , 0);

console.log(`Total: ${totalAge(...ageEx)}, Min: ${minAge1(...ageEx)}, Max: ${maxAge2(...ageEx)}`);
console.log(`Buckets: { teen: ${teenAge(...ageEx)}, adult: ${adultAge(...ageEx)} }`);
