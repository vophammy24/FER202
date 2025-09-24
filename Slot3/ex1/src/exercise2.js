let numbers = [1, 2, 3, "abc", 5];

function sum2(){
    let total = 0;
    for (let num of nums){
        total += num;
    }
    return total;
}
console.log(sum2());

const oddNumbers = numbers.filter(num => num % 2 !== 0);
for(let num of oddNumbers){
    console.log(num);
}
oddNumbers.forEach(num => console.log(num));

console.log(oddNumbers);

const sum1 = (...nums) => nums.filter(num => typeof num === 'number' && !isNaN(num)).reduce((acc, num) =>  acc + num, 0);
// console.log(sum1(numbers));
console.log(sum1(1, 2, 3, "abc", 4));

// function sum(...nums) {
//     let total = 0;
//     for (let num of nums) {
//         if (typeof num === 'number' && !isNaN(num)) {
//             total += num;
//         }
//     }
//     return total;
// }
// console.log(sum(1, 2, 3)); 
// console.log(sum(1, 'x',4));

// function avg(...nums) {
//     if (nums.length === 0) return 0;
//     return sum(...nums) / nums.length;
// }
// console.log(avg(1, 2, 3, 4));
// console.log(avg());