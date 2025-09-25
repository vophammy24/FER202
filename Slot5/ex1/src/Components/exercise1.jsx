export function Exercise1() {
    const double = n => n * 2;
    const isPositive = n => n > 0;
    return(
        <>
        <p>Double function: {double(5)}</p>
        <p>Is 5 positive? {isPositive(5) ? "Yes" : "No"}</p>
        </>
            
    )
}