import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import DebugInfo from './DebugInfo';

function App() {
  const [backendData, setBackendData] = useState(null);
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend URL - will work both locally and on Vercel
  const rawBackendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  
  // Ensure the backend URL has the proper protocol
  const BACKEND_URL = rawBackendUrl.startsWith('http') 
    ? rawBackendUrl 
    : `https://${rawBackendUrl}`;

  console.log('App component initialized');
  console.log('Raw Backend URL:', rawBackendUrl);
  console.log('Final Backend URL:', BACKEND_URL);
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL
  });

  useEffect(() => {
    console.log('useEffect triggered - fetching data from backend');
    
    const fetchData = async () => {
      try {
        console.log('Setting loading state to true');
        setLoading(true);
        
        console.log('Making API calls to backend...');
        console.log(`Fetching from: ${BACKEND_URL}/api/hello`);
        console.log(`Fetching from: ${BACKEND_URL}/api/status`);
        
        // Fetch data from backend API
        const [helloResponse, statusResponse] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/hello`),
          axios.get(`${BACKEND_URL}/api/status`)
        ]);

        console.log('API calls successful!');
        console.log('Hello response:', helloResponse.data);
        console.log('Status response:', statusResponse.data);
        console.log('Response headers (hello):', helloResponse.headers);
        console.log('Response status (hello):', helloResponse.status);

        // Validate that we got JSON responses, not HTML
        if (typeof helloResponse.data === 'string' && helloResponse.data.includes('<!doctype html>')) {
          throw new Error('Received HTML instead of JSON - check backend URL and deployment');
        }

        if (typeof statusResponse.data === 'string' && statusResponse.data.includes('<!doctype html>')) {
          throw new Error('Received HTML instead of JSON - check backend URL and deployment');
        }

        // Validate response structure
        if (!helloResponse.data || !helloResponse.data.data) {
          throw new Error('Invalid response structure from /api/hello endpoint');
        }

        console.log('Updating state with backend data...');
        setBackendData(helloResponse.data);
        setServerStatus(statusResponse.data);
        setError(null);
        
        console.log('Data fetch completed successfully');
      } catch (err) {
        console.error('Error fetching data from backend:');
        console.error('Error details:', err);
        console.error('Error message:', err.message);
        console.error('Error response:', err.response?.data);
        console.error('Error status:', err.response?.status);
        console.error('Error headers:', err.response?.headers);
        
        let errorMessage = 'Failed to connect to backend API';
        
        if (err.code === 'ECONNREFUSED') {
          console.error('Connection refused - backend server might be down');
          errorMessage = 'Backend server is not responding';
        } else if (err.code === 'NETWORK_ERROR') {
          console.error('Network error - check internet connection');
          errorMessage = 'Network connection error';
        } else if (err.message.includes('HTML instead of JSON')) {
          console.error('Received HTML instead of JSON - wrong endpoint or deployment issue');
          errorMessage = 'Backend API not found - check deployment and URL configuration';
        } else if (err.response?.status === 404) {
          console.error('404 - API endpoints not found');
          errorMessage = 'API endpoints not found - check backend deployment';
        } else if (err.response?.status >= 500) {
          console.error('Server error - backend is having issues');
          errorMessage = 'Backend server error - please try again later';
        }
        
        setError(errorMessage);
        setBackendData(null);
        setServerStatus(null);
        console.log('Error state updated');
      } finally {
        console.log('Setting loading state to false');
        setLoading(false);
      }
    };

    fetchData();
  }, [BACKEND_URL]);

  const refreshData = () => {
    console.log('Refresh button clicked by user');
    console.log('Clearing current state...');
    setLoading(true);
    setError(null);
    console.log('Reloading page to re-trigger data fetch...');
    // Re-trigger the effect by changing a dependency
    window.location.reload();
  };

  // Log state changes
  useEffect(() => {
    console.log('State updated - Loading:', loading);
  }, [loading]);

  useEffect(() => {
    console.log('State updated - Error:', error);
  }, [error]);

  useEffect(() => {
    console.log('State updated - Backend Data:', backendData);
  }, [backendData]);

  useEffect(() => {
    console.log('State updated - Server Status:', serverStatus);
  }, [serverStatus]);

  console.log('Rendering App component with current state:', {
    loading,
    error: !!error,
    hasBackendData: !!backendData,
    hasServerStatus: !!serverStatus
  });

  const formatUptime = (uptimeSeconds) => {
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const formatMemory = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full-Stack React + Node.js Demo</h1>
        <p>Professional demonstration of React frontend connected to Node.js backend API</p>
        
        {loading && (
          <div className="loading">
            {console.log('Rendering loading state')}
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span className="connection-status">Connecting to Backend</span>
            </div>
            Establishing connection...
          </div>
        )}
        
        {error && (
          <div className="error">
            {console.log('Rendering error state:', error)}
            <p>Connection Failed</p>
            <p>{error}</p>
            <div className="error-details">
              <strong>Backend URL:</strong> {BACKEND_URL}<br/>
              <strong>Troubleshooting:</strong> Ensure backend is deployed and accessible
            </div>
            <button onClick={refreshData} className="retry-btn">
              Retry Connection
            </button>
          </div>
        )}

        {!loading && !error && backendData && backendData.data && (
          <div className="success">
            {console.log('Rendering success state with data')}
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span className="connection-status">Connected</span>
            </div>
            <h2>Backend Connection Successful</h2>
            
            <div className="data-section">
              <h3>API Response Data</h3>
              <div className="data-card">
                <p><strong>Message:</strong> {backendData.message}</p>
                <p><strong>User:</strong> {backendData.data.user}</p>
                <p><strong>Status:</strong> {backendData.data.status}</p>
                <div>
                  <strong>Technology Stack:</strong>
                  <div className="tech-stack-grid">
                    {backendData.data.features && backendData.data.features.map((feature, index) => {
                      console.log(`Rendering feature ${index + 1}:`, feature);
                      return (
                        <div key={index} className="tech-item">
                          {feature}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {serverStatus && (
              <div className="status-section">
                {console.log('Rendering server status section')}
                <h3>Server Performance Metrics</h3>
                <div className="status-card">
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <span className="metric-value">{serverStatus.status}</span>
                      <span className="metric-label">Health Status</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-value">{formatUptime(serverStatus.uptime)}</span>
                      <span className="metric-label">Uptime</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-value">{serverStatus.version}</span>
                      <span className="metric-label">API Version</span>
                    </div>
                    {serverStatus.memoryUsage && (
                      <div className="metric-item">
                        <span className="metric-value">{formatMemory(serverStatus.memoryUsage.heapUsed)}</span>
                        <span className="metric-label">Memory Usage</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={() => {
                console.log('Refresh button clicked - triggering data refresh');
                refreshData();
              }} 
              className="refresh-btn"
            >
              Refresh Data
            </button>
          </div>
        )}
      </header>
      
      <DebugInfo 
        backendUrl={BACKEND_URL}
        loading={loading}
        error={error}
        backendData={backendData}
        serverStatus={serverStatus}
      />
    </div>
  );
}

export default App; 