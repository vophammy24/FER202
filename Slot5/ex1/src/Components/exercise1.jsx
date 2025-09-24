export function Exercise1() {
    const double = n => n * 2;
    const isPositive = n => n > 0;
    return(
        <>
        <h1>Hello <strong>Exercise 1</strong></h1>
        <p>Double function: {double(5)}</p>
        <p>Is 5 positive? {isPositive(5) ? "Yes" : "No"}</p>
        </>
            
    )
}