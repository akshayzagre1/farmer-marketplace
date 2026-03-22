import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className="card">
      <h1>Sell Fresh Crops Directly</h1>
      <p>
        This MVP helps farmers list crops at fair prices and lets buyers connect directly without
        middlemen.
      </p>
      <div className="row">
        <Link className="btn" to="/register">
          Get Started
        </Link>
        <Link className="btn btn-light" to="/browse">
          Browse Crops
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
