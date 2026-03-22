const API_BASE_URL = 'http://localhost:5000/api';

const request = async (endpoint, options = {}, token = '') => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),

  getCrops: (search = '', location = '') =>
    request(`/crops?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`),

  createCrop: (payload, token) =>
    request('/crops', { method: 'POST', body: JSON.stringify(payload) }, token),
  getMyCrops: (token) => request('/crops/farmer/my', {}, token),
  deleteCrop: (id, token) => request(`/crops/${id}`, { method: 'DELETE' }, token),

  createOrder: (payload, token) =>
    request('/orders', { method: 'POST', body: JSON.stringify(payload) }, token)
};
