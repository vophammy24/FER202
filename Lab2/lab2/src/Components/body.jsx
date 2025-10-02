export function Body () {
    const products = [
        {id: '1', name: 'Margherita Pizza', price: '$40.00', sale: '$24.00', img: '/Margherita.jpg'},
        {id: '2', name: 'Mushroom Pizza', price: '$25.00', sale: '', img: '/Mushroom.jpg'},
        {id: '3', name: 'Hawaiian Pizza', price: '$30.00', sale: '', img: '/Hawaiian.jpg'},
        {id: '4', name: 'Pesto Pizza', price: '$50.00', sale: '$30.00', img: '/Pesto.jpg'}
    ];
    return (
        <div className ="container my-4 p-4">
                <h2 className="text-white">Our Menu</h2>
                <div className="row">
                    {products.map((product, index) => (
                    <div className="col-md-3 mb4 d-flex justify-content-center"  style={{maxHeight: "500px"}} key={index}>
                        <div className="card">
                            <img src={product.img} alt={product.name} className="card-img-top" style={{maxWidth:"300px", objectFit: "cover"}}/>
                            <div className="card-body">
                                <span className="text-center fs-3">{product.name}</span>
                                    <div className="my-2">
                                    {product.sale ? (
                                        <>
                                            <del className="text-muted me-2">{product.price}</del>
                                            <span className="text-warning fw-bold">{product.sale}</span>
                                        </>
                                    ) : (
                                        <span className="fw-bold">{product.price}</span>
                                    )}
                                </div>
                                <button className="btn btn-secondary text-white fw-bold w-100">Buy</button>
                            </div>
                        </div>
                        
                    </div>
                    ))}
                </div>
        </div>
    )
}