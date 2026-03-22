# Farmer Marketplace MVP

A simple full-stack MVP where farmers can list crops and buyers can browse and place basic orders directly.

## Project Structure

```
farmer-marketplace/
  backend/    # Node.js + Express + MongoDB API
  frontend/   # React app (Vite)
```

## Core Features Implemented

- Farmer and buyer registration/login (JWT auth)
- Farmers can create and manage crop listings
- Buyers can browse/search crop listings
- Buyers can place basic order requests and directly view farmer contact details
- Farmer dashboard for listing management

## Backend Setup

1. Go to backend:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create environment file:
   ```bash
   cp .env.example .env
   ```
4. Start backend server:
   ```bash
   npm run dev
   ```

Backend runs at `http://localhost:5000`.

## Frontend Setup

1. Go to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend app:
   ```bash
   npm run dev
   ```

Frontend runs at `http://localhost:5173`.

## API Endpoints (MVP)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Crops
- `GET /api/crops` (public)
- `GET /api/crops/farmer/my` (farmer)
- `POST /api/crops` (farmer)
- `PUT /api/crops/:id` (farmer)
- `DELETE /api/crops/:id` (farmer)

### Orders
- `POST /api/orders` (buyer)
- `GET /api/orders/buyer/my` (buyer)
- `GET /api/orders/farmer/my` (farmer)

## Notes

- This MVP intentionally keeps the flow simple and beginner-friendly.
- Image upload is URL-based for now to avoid extra complexity.
