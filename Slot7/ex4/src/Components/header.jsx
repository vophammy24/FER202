export function Header() {
  return (
    <div className="container-fluid pt-2" style={{ backgroundColor: "orange"}}>
        <div className="container">
            <img src="/fptlogo.png" alt="FPTU Logo" className="img-fluid d-block mx-auto"  style={{maxWidth: "500px"}}/>
            <ul className="nav justify-content-center my-2">
                <li className="nav-item">
                <a className="nav-link text-white" href="#">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-white" href="#">About</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-white" href="#">Contact</a>
                </li>
            </ul>
        </div>
    </div>
  );
}