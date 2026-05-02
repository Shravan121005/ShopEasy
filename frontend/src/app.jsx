import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import ProtectedRoute from './components/protectedRoute';
import Home from './pages/home';
import ProductDetail from './pages/productDetail';
import Cart from './pages/cart';
import Login from './pages/login';
import Register from './pages/register';
import AdminDashboard from './pages/adminDashboard';

function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected: logged-in users */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Protected: admin only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
