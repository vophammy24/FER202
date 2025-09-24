const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
const [first, , third = 0, ...restAges] = ages;
console.log(first, third, restAges);

const sum = (...nums) => restAges.reduce((acc, age) => acc + age, 0);
console.log(sum());

const oddAges = (...nums) => restAges.filter(age => age % 2 !== 0); // là một arrow function trả về một mảng với tham số đầu vào là các biến hàm

const oddAges2 = restAges.filter(age => age % 2 !== 0); //là một biến mảng với các phần tử là các số lẻ trong mảng restAges