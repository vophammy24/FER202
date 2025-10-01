export function Header() {
    return (
        <nav class="navbar navbar-expand-lg" style={{ backgroundColor: "#EACDAD" }}>
            <div class="container">
                <a className="navbar-brand">
                    <img src="/fptlogo1.png" alt="FPTU Logo" style={{maxWidth: "100px"}}/>
                </a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="">🏠︎Trang chủ</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="">ℹNgành học</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="">🪪Tuyển sinh</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="">≔Sinh viên</a>
                        </li>
                    </ul>
                    <form class="d-flex align-items-center"> 
                        <span className="me-2">Search: </span> 
                        <input class="form-control" type="search" aria-label="Search"/>
                    </form>
                </div>
            </div>
        </nav>
    )
}