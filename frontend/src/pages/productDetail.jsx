import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import api from '../api/axios';
import { useAuth } from '../context/authContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartMsg, setCartMsg] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await api.post('/cart', { productId: product._id, quantity: 1 });
      setCartMsg('Added to cart!');
      setTimeout(() => setCartMsg(''), 2500);
    } catch {
      setCartMsg('Failed to add to cart.');
      setTimeout(() => setCartMsg(''), 2500);
    }
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <Row className="g-4">
        <Col md={5}>
          <img
            src={product.image || 'https://placehold.co/500x400?text=Product'}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={7}>
          <Badge bg="secondary" className="mb-2">{product.category}</Badge>
          <h2 className="fw-bold">{product.name}</h2>
          <h4 className="text-success mb-3">${parseFloat(product.price).toFixed(2)}</h4>
          <p className="text-muted">{product.description || 'No description provided.'}</p>
          {cartMsg && <Alert variant="success" className="py-2">{cartMsg}</Alert>}
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
