import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState(null);
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend URL - will work both locally and on Vercel
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from backend API
        const [helloResponse, statusResponse] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/hello`),
          axios.get(`${BACKEND_URL}/api/status`)
        ]);

        setBackendData(helloResponse.data);
        setServerStatus(statusResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to connect to backend API');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BACKEND_URL]);

  const refreshData = () => {
    setLoading(true);
    setError(null);
    // Re-trigger the effect by changing a dependency
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Full-Stack React + Node.js Demo</h1>
        <p>Demonstrating React frontend connected to Node.js backend API</p>
        
        {loading && <div className="loading">Loading...</div>}
        
        {error && (
          <div className="error">
            <p>❌ {error}</p>
            <button onClick={refreshData} className="retry-btn">
              Retry Connection
            </button>
          </div>
        )}

        {!loading && !error && backendData && (
          <div className="success">
            <h2>✅ Backend Connection Successful!</h2>
            
            <div className="data-section">
              <h3>API Response:</h3>
              <div className="data-card">
                <p><strong>Message:</strong> {backendData.message}</p>
                <p><strong>User:</strong> {backendData.data.user}</p>
                <p><strong>Status:</strong> {backendData.data.status}</p>
                <div>
                  <strong>Tech Stack:</strong>
                  <ul>
                    {backendData.data.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {serverStatus && (
              <div className="status-section">
                <h3>Server Status:</h3>
                <div className="status-card">
                  <p><strong>Status:</strong> {serverStatus.status}</p>
                  <p><strong>Uptime:</strong> {Math.floor(serverStatus.uptime)} seconds</p>
                  <p><strong>Version:</strong> {serverStatus.version}</p>
                </div>
              </div>
            )}

            <button onClick={refreshData} className="refresh-btn">
              🔄 Refresh Data
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App; 