import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BrowsePage from './pages/BrowsePage';
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import { useAuth } from './context/AuthContext';

const ProtectedFarmerRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== 'farmer') {
    return <Navigate to="/browse" />;
  }

  return children;
};

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedFarmerRoute>
              <FarmerDashboardPage />
            </ProtectedFarmerRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
