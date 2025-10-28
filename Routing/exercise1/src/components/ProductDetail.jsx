import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function ProductDetail(){

    const { productId } = useParams();
    const navigate = useNavigate();

    return (
    <div style={{ padding: "20px" }}>
      <h2>Chi tiết sản phẩm: {productId}</h2>

      <Button
        onClick={() => navigate("/san-pham")}
        style={{ marginTop: 12, padding: "8px 12px", cursor: "pointer" }}
      >
        Quay lại trang sản phẩm
      </Button>
    </div>
    )
}