import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1 text-secondary">404</h1>
      <h2 className="text-muted">Page Not Found</h2>
      <p className="text-center text-secondary">
        The page you are looking for does not exist or has been moved.
      </p>
      <a href="/" className="btn btn-outline-dark mt-3">
        Go Back to Home
      </a>
    </div>
  );
}

export default NotFound;