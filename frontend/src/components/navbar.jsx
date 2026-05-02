import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="fw-bold fs-4">
          🛒 ShopEasy
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-nav" />
        <BsNavbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-2">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin">
                    <Badge bg="warning" text="dark">
                      Admin
                    </Badge>
                  </Nav.Link>
                )}
                <span className="text-light me-2 small">Hi, {user.name}</span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  size="sm"
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
