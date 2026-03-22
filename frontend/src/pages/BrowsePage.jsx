import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BrowsePage = () => {
  const { user, token } = useAuth();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadCrops = async () => {
    try {
      const data = await api.getCrops(search, location);
      setCrops(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadCrops();
  }, []);

  const placeOrder = async (cropId) => {
    if (!token || user?.role !== 'buyer') {
      setMessage('Please login as buyer to place an order.');
      return;
    }

    try {
      await api.createOrder({ cropId, quantity: 1, message: 'Interested in this crop. Please contact me.' }, token);
      setMessage('Order request sent to farmer successfully.');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section>
      <div className="card">
        <h2>Browse Crop Listings</h2>
        <div className="search-row">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search crop name" />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Filter by location" />
          <button className="btn" onClick={loadCrops}>
            Search
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <div className="grid">
        {crops.map((crop) => (
          <article key={crop._id} className="card crop-card">
            <img src={crop.image || 'https://via.placeholder.com/500x250?text=Crop+Image'} alt={crop.name} />
            <h3>{crop.name}</h3>
            <p>Price: ${crop.price} per unit</p>
            <p>Quantity: {crop.quantity}</p>
            <p>Location: {crop.location}</p>
            <p>Farmer: {crop.farmer?.name}</p>
            <p>Contact: {crop.farmer?.email}</p>
            <button className="btn" onClick={() => placeOrder(crop._id)}>
              Place Basic Order
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BrowsePage;
