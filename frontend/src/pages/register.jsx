import { useState } from 'react';
import { Form, Button, Card, Alert, Collapse } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    adminSecret: '',
  });
  const [showAdmin, setShowAdmin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.adminSecret);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <Card className="shadow-sm border-0 w-100" style={{ maxWidth: '440px' }}>
        <Card.Body className="p-4">
          <h3 className="fw-bold mb-4 text-center">Create Account</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                required
              />
            </Form.Group>

            <div className="mb-3">
              <Button
                variant="link"
                size="sm"
                className="p-0 text-muted"
                onClick={() => setShowAdmin(!showAdmin)}
              >
                {showAdmin ? '▾' : '▸'} Register as admin?
              </Button>
              <Collapse in={showAdmin}>
                <div className="mt-2">
                  <Form.Control
                    type="password"
                    name="adminSecret"
                    value={form.adminSecret}
                    onChange={handleChange}
                    placeholder="Admin secret key"
                  />
                </div>
              </Collapse>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Register'}
            </Button>
          </Form>
          <p className="text-center mt-3 mb-0 small">
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
