export function Footer() {
    return (
        <div className="container-fluid py-4" style={{ backgroundColor: "#E87A3D" }}>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h5>Our Address</h5>
                    <h6>Khu đô thị FPT Đà Nẵng</h6>
                    <ul className="list-unstyled">
                        <li>🕻:+84023111111</li>
                        <li>☏: +852 8765 4321</li>
                        <li>✉: fptudn@fpt.edu.vn</li>
                    </ul>
                </div>
                <div className="col-md-6 text-end">
                    <div className="fs-4">
                        <a href="#" className="text-black mx-2"><i className="bi bi-google"></i></a>
                        <a href="#" className="text-black mx-2"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="text-black mx-2"><i className="bi bi-linkedin"></i></a>
                        <a href="#" className="text-black mx-2"><i className="bi bi-twitter"></i></a>
                        <a href="#" className="text-black mx-2"><i className="bi bi-youtube"></i></a>
                    </div>
                </div>
            </div>
            <h6 className="text-center fw-normal">© Copyright 2023</h6>
        </div>
    )
}