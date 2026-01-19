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
      padding: '1rem'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: '0.5rem 0',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h1 style={{
          margin: 0,
          color: '#2563eb',
          fontSize: '1.8rem',
          fontWeight: '600'
        }}>
          Eating Insights
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#c82333';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#dc3545';
          }}
        >
          Logout
        </button>
      </header>

      <nav style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setActiveTab('present')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'present' ? '#2563eb' : '#f9fafb',
            color: activeTab === 'present' ? 'white' : '#6b7280',
            border: `2px solid ${activeTab === 'present' ? '#2563eb' : '#e5e7eb'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            if (activeTab !== 'present') {
              e.target.style.borderColor = '#2563eb';
              e.target.style.backgroundColor = '#f0f4ff';
            }
          }}
          onMouseOut={(e) => {
            if (activeTab !== 'present') {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.backgroundColor = '#f9fafb';
            }
          }}
        >
          Present
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'history' ? '#2563eb' : '#f9fafb',
            color: activeTab === 'history' ? 'white' : '#6b7280',
            border: `2px solid ${activeTab === 'history' ? '#2563eb' : '#e5e7eb'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            if (activeTab !== 'history') {
              e.target.style.borderColor = '#2563eb';
              e.target.style.backgroundColor = '#f0f4ff';
            }
          }}
          onMouseOut={(e) => {
            if (activeTab !== 'history') {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.backgroundColor = '#f9fafb';
            }
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
