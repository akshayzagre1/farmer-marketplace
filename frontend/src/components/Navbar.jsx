import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav">
      <Link to="/" className="brand">
        Farmer Marketplace
      </Link>
      <div className="nav-links">
        <Link to="/browse">Browse Crops</Link>
        {isAuthenticated ? (
          <>
            {user?.role === 'farmer' && <Link to="/dashboard">Farmer Dashboard</Link>}
            <span className="welcome">Hi, {user?.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
