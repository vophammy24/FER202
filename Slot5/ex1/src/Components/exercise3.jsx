export function Exercise3 () {
    const person = {
    name: "Costas",
    address: {
        street: "Lalaland 12"
    }
    };

    const {
    address: {
        street,
        city = "Unknown City"
    }
    } = person;
    return (
        <>
        <p>Street: {street}, City: {city}</p>
        </>
     )
}