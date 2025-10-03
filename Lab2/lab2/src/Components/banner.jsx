export function Banner () {
    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="/banner1.jpg" className="d-block  w-100" alt="Banner 1" style={{ height: "500px", objectFit: "cover" }}/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Margherita Pizza</h5>
                    <p>Classic Italian pizza topped with fresh tomatoes, mozzarella, and basil.</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src="/banner2.1.jpg" className="d-block w-100" alt="Banner 2" style={{ height: "500px", objectFit: "cover" }}/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Pepperoni Pizza</h5>
                    <p>A favorite loaded with spicy pepperoni slices and melted cheese.</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src="/banner3.jpg" className="d-block w-100" alt="Banner3 " style={{ height: "500px", objectFit: "cover" }}/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Hawaiian Pizza</h5>
                    <p>Sweet and savory mix of ham, pineapple, and mozzarella.</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src="/banner4.jpg" className="d-block w-100" alt="Banner 4" style={{ height: "500px", objectFit: "cover" }}/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>BBQ Chicken Pizza</h5>
                    <p>Smoky barbecue sauce with grilled chicken, onions, and cheese.</p>
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        
    )
}