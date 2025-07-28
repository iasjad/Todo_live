import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-form" style={{ textAlign: 'center', gap: '25px' }}>
        <h2>Welcome!</h2>
        <p style={{ color: '#555', marginTop: 0, lineHeight: '1.5' }}>
          Please log in or register to access the collaborative to-do list.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
