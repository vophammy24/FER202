export function Header() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand text-white fw-semibold fs-2" href="#">Pizza House</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto ms-3">
                        <li className="nav-item">
                            <a className="nav-link text-white active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white-50"href="#">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white-50" href="#">Contact</a>
                        </li>
                    </ul>
                    <form class="d-flex">  
                        <input class="form-control" type="search" aria-label="Search" placeholder="Search"/>
                        <button class="btn btn-danger" type="submit">🔍︎</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}