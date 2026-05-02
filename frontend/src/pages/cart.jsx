import { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Image } from 'react-bootstrap';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch {
      setError('Failed to load cart.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      setCart(data);
    } catch {
      setError('Failed to update quantity.');
    }
  };

  const removeItem = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCart(data);
    } catch {
      setError('Failed to remove item.');
    }
  };

  const total = cart?.items?.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  ) || 0;

  if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;

  return (
    <>
      <h1 className="mb-4 fw-bold">Your Cart</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      {!cart || cart.items.length === 0 ? (
        <Alert variant="info">
          Your cart is empty.{' '}
          <Link to="/">Continue shopping</Link>
        </Alert>
      ) : (
        <>
          <Table responsive hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.items
                ?.filter(item => item.productId) 
                .map((item) => (
                  <tr key={item.productId._id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Image
                          src={item.productId.image || 'https://placehold.co/60x60?text=P'}
                          width={60}
                          height={60}
                          rounded
                          style={{ objectFit: 'cover' }}
                        />
                        {item.productId.name}
                      </div>
                    </td>

                    <td>${parseFloat(item.productId.price).toFixed(2)}</td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                        >−</Button>

                        <span className="fw-semibold">{item.quantity}</span>

                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        >+</Button>
                      </div>
                    </td>

                    <td>${(item.productId.price * item.quantity).toFixed(2)}</td>

                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeItem(item.productId._id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <div className="text-end">
            <h5 className="fw-bold">Total: <span className="text-success">${total.toFixed(2)}</span></h5>
            <Button variant="success" size="lg" className="mt-2">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
