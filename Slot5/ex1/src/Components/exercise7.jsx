export function Exercise7 () {
    const companies = [
        { name: "ABC Agency", category: "Media Communication", start: 2020, end: 2025 },
        { name: "SunGroup", category: "Marketing", start: 1998, end: 2025 }
    ];

    const company0New = { ...companies[0], start: companies[0].start + 1, end: companies[0].end -1 };

    const array1 = [1, 2, 6];
    const array2 = [3, 5];
    const array3 = [6, 7, 8, 9];
    // Viết hàm concatAll(...arrays) trả về mảng gộp của mọi mảng truyền vào
    function concatAll(...arrays) {
        return [].concat(...arrays); // [] là mảng rỗng, .concat là phương thức gộp mảng, ...arrays là toán tử spread trải mọi phần tử mảng trong arrays thành các đối số riêng lẻ
    }

    return (
        <>
        <p>Companies:</p>
        <ul>
            {companies.map((company, index) => (
                <li key={index}> Index{index} : {company.name} - {company.category} ({company.start} - {company.end})</li>
            ))}
        </ul>
        <p>Company 0 New:</p>
        <ul>
            <li>{company0New.name} - {company0New.category} ({company0New.start} - {company0New.end})</li>
        </ul>
        <p>Companies:</p>
        <ul>
            {companies.map((company, index) => (
                <li key={index}> Index{index} : {company.name} - {company.category} ({company.start} - {company.end})</li>
            ))}
        </ul>

        <p>Array 1:  {array1.map((num, index) => (<span key={index}>{num} </span>))} </p>
        <p>Array 2:  {array2.map((num, index) => (<span key={index}>{num} </span>))} </p>
        <p>Array 3:  {array3.map((num, index) => (<span key={index}>{num} </span>))} </p>
        <p>Concat All:</p>
        <ul>
            {concatAll(array1, array2, array3).map((num, index) => (
                <li key={index}>{num}</li>
            ))}
        </ul>
        </>
    )
}