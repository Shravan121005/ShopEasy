import { Link } from 'react-router-dom';
import { Card, Badge, Button } from 'react-bootstrap';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={product.image || 'https://placehold.co/400x300?text=Product'}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="mb-2 align-self-start">
          {product.category}
        </Badge>
        <Card.Title className="fs-6 fw-semibold">{product.name}</Card.Title>
        <Card.Text className="text-success fw-bold fs-5 mb-auto">
          ${parseFloat(product.price).toFixed(2)}
        </Card.Text>
        <div className="d-flex gap-2 mt-3">
          <Button
            as={Link}
            to={`/product/${product._id}`}
            variant="outline-primary"
            size="sm"
            className="flex-grow-1"
          >
            View Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-grow-1"
            onClick={() => onAddToCart && onAddToCart(product._id)}
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
