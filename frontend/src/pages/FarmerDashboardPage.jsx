import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const initialForm = { name: '', price: '', quantity: '', location: '', image: '' };

const FarmerDashboardPage = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [myCrops, setMyCrops] = useState([]);
  const [message, setMessage] = useState('');

  const loadMyCrops = async () => {
    try {
      const data = await api.getMyCrops(token);
      setMyCrops(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    if (!token || user?.role !== 'farmer') {
      navigate('/login');
      return;
    }
    loadMyCrops();
  }, [token, user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await api.createCrop(
        {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity)
        },
        token
      );
      setForm(initialForm);
      setMessage('Crop listing created successfully.');
      loadMyCrops();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const deleteCrop = async (id) => {
    try {
      await api.deleteCrop(id, token);
      setMessage('Listing removed.');
      loadMyCrops();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section>
      <div className="card form-card">
        <h2>Farmer Dashboard</h2>
        <p>Add crop listings and manage what buyers can see.</p>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Crop name" value={form.name} onChange={handleChange} required />
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            name="quantity"
            type="number"
            min="1"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} />
          <button className="btn" type="submit">
            Add Listing
          </button>
        </form>
      </div>

      {message && <p className="success">{message}</p>}

      <div className="grid">
        {myCrops.map((crop) => (
          <article key={crop._id} className="card crop-card">
            <img src={crop.image || 'https://via.placeholder.com/500x250?text=Crop+Image'} alt={crop.name} />
            <h3>{crop.name}</h3>
            <p>${crop.price} per unit</p>
            <p>Qty: {crop.quantity}</p>
            <p>{crop.location}</p>
            <button className="btn btn-danger" onClick={() => deleteCrop(crop._id)}>
              Delete
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FarmerDashboardPage;
