import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple login validation
    if (username.trim() && password.trim()) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{
          margin: '0px',
          color: 'rgb(26, 26, 26)',
          fontSize: '1.8rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Eating Behavior Insight
        </h1>
        <p style={{
          color: '#666666',
          fontSize: '1.1rem',
          maxWidth: '400px',
          margin: '0 auto',
          lineHeight: '1.5'
        }}>
          Understand your eating patterns with gentle guidance
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '320px'
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: '1rem',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '1rem',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />

        <button
          type="submit"
          style={{
            padding: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Sign In
        </button>

        <p style={{
          textAlign: 'center',
          color: '#999999',
          fontSize: '0.9rem',
          margin: '0'
        }}>
          Demo: username "demo", password "password"
        </p>
      </form>
    </div>
  );
};

export default Landing;
