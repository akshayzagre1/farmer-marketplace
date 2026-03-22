import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await api.login(form);
      login(data);
      navigate(data.user.role === 'farmer' ? '/dashboard' : '/browse');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card form-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <p>
        No account yet? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default LoginPage;
