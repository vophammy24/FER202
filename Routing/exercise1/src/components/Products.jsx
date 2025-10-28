//Create a Products component that displays a list of products.

import { Link } from "react-router-dom";

function Products() {
    const productList = [
        { id: 101, name: 'Product A', price: '$10' },
        { id: 102, name: 'Product B', price: '$20' },
        { id: 103, name: 'Product C', price: '$30' },
    ];

    return (
        <div>
            <Card>
                <h2>Products</h2>
                <ul>
                    {productList.map(product => (
                        <li key={product.id}>
                            <Link to={`/san-pham/${product.id}`}>
                            {product.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}

function Card({ children }) {
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    };
    return <div style={cardStyle}>{children}</div>;
}
export default Products;