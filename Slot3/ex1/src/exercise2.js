function sum(...nums) {
    let total = 0;
    for (let num of nums) {
        if (typeof num === 'number' && !isNaN(num)) {
            total += num;
        }
    }
    return total;
}
console.log(sum(1, 2, 3)); 
console.log(sum(1, 'x',4));

function avg(...nums) {
    if (nums.length === 0) return 0;
    return sum(...nums) / nums.length;
}
console.log(avg(1, 2, 3, 4));
console.log(avg());