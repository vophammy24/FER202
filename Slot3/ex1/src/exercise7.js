const companies = [
	{ name: "ABC Agency", category: "Media Communication", start: 2020, end: 2025 },
	{ name: "SunGroup", category: "Marketing", start: 1998, end: 2025 }
];

// Tạo company0New với start += 1 mà không làm đổi companies[0]
//cú pháp const objX = {...obj1, attribute: value}
const company0New = { ...companies[0], name: "VNG", category: "Technology", start: companies[0].start + 1, end: companies[0].end -1 };

console.log("companies[0]", companies[0]);
console.log("company0New", company0New);
console.log("companies[0]", companies[0]);

// Viết hàm concatAll(...arrays) trả về mảng gộp của mọi mảng truyền vào
function concatAll(...arrays) {
    return [].concat(...arrays); // [] là mảng rỗng, .concat là phương thức gộp mảng, ...arrays là toán tử spread trải mọi phần tử mảng trong arrays thành các đối số riêng lẻ
}

console.log("concatAll([1,2,6],[3,7],[4,5,8,9])", concatAll([1,2,6],[3,7],[4,5,8,9]));