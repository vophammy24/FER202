export function Exercise6 () {
        const companies = [
        { name: "Company One", category: "Finance", start: 1981, end: 2004 },
        { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
        { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
        { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
        { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
        { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
        { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
        { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
        { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
        ];

        

        const list = companies.filter(c => c.category === "Finance" || c.category === "Technology");

        const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

        // sortedCompanies.slice(0, 3).forEach(c => {
        // console.log(`${c.name} - ${c.end}`);
        // });
        const sortedbyName = [...companies].sort((a, b) => b.name.localeCompare(a.name));

    return (
        <>
        <p>Company:</p>
        <ul>
            {companies.map((company, idx) => (
                <li key={idx}>
                    <strong>{company.name}</strong><br/>
                    <span>Category: {company.category}</span><br/>
                    <span>Start: {company.start}</span><br/>
                    <span>End: {company.end}</span>
                </li>
            ))}
        </ul>
        <p>Company after sort by Year End:</p>
        <ul>
            {sortedCompanies.map((company, idx) => (
                <li key={idx}>
                    <strong>{company.name}</strong><br/>
                    <span>Category: {company.category}</span><br/>
                    <span>Start: {company.start}</span><br/>
                    <u>End: {company.end}</u>                 
                </li>
            ))}
        </ul>
        <p>Top 3 company sort by Year End:</p>
        <ul>
            {sortedCompanies.slice(0, 3).map((company, idx) => (
                <li key={idx}>
                    <strong>{company.name}</strong><br/>
                    <u>End: {company.end}</u><br/>
                    <span>Category: {company.category}</span><br/>
                    <span>Start: {company.start}</span>
                </li>
            ))}
        </ul>
        <p>List Finance or Technology:</p>
        <ul>
            {list.map((company, idx) => (
                <li key={idx}>
                    <strong>{company.name}</strong><br/>
                    <span>Category: {company.category}</span><br/>
                </li>
                ))}
        </ul>    
        </>
    )
}