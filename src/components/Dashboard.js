import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PresentTab from './PresentTab';
import HistoryTab from './HistoryTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('present');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '2rem'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem 0',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <h1 style={{
          margin: 0,
          color: '#1a1a1a',
          fontSize: '1.8rem',
          fontWeight: '600'
        }}>
          Eating Insights
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#f8f9fa',
            color: '#6c757d',
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#e9ecef';
            e.target.style.borderColor = '#adb5bd';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.borderColor = '#dee2e6';
          }}
        >
          Logout
        </button>
      </header>

      <nav style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setActiveTab('present')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'present' ? '#007bff' : 'transparent',
            color: activeTab === 'present' ? 'white' : '#6c757d',
            border: '1px solid #007bff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
        >
          Present
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'history' ? '#007bff' : 'transparent',
            color: activeTab === 'history' ? 'white' : '#6c757d',
            border: '1px solid #007bff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
        >
          History
        </button>
      </nav>

      <main>
        {activeTab === 'present' && <PresentTab />}
        {activeTab === 'history' && <HistoryTab />}
      </main>
    </div>
  );
};

export default Dashboard;
