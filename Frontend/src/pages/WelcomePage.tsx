import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-form" style={{ textAlign: 'center' }}>
        <h2>Welcome to the To-Do List!</h2>
        <p>Please log in or register to continue.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
