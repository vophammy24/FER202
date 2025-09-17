const double1 = (x) => {
    return x * 2;
}
console.log(double1(7));
//other way
const double2 = x => x * 2;
console.log(double2(7));
//other way
const double3 = x => (x * 2);
console.log(double3(7));

const isEven1 = (num) => {
    return num % 2 === 0;
}
console.log(isEven1(10));
//other way
const isEven2 = num => num % 2 === 0;
console.log(isEven2(7));
//other way
const isEven3 = num => (num % 2 === 0);
console.log(isEven3(10));
