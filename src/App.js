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
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  console.log('🎯 App component initialized');
  console.log('🔗 Backend URL:', BACKEND_URL);
  console.log('🌍 Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL
  });

  useEffect(() => {
    console.log('⚡ useEffect triggered - fetching data from backend');
    
    const fetchData = async () => {
      try {
        console.log('🔄 Setting loading state to true');
        setLoading(true);
        
        console.log('📡 Making API calls to backend...');
        console.log(`📥 Fetching from: ${BACKEND_URL}/api/hello`);
        console.log(`📥 Fetching from: ${BACKEND_URL}/api/status`);
        
        // Fetch data from backend API
        const [helloResponse, statusResponse] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/hello`),
          axios.get(`${BACKEND_URL}/api/status`)
        ]);

        console.log('✅ API calls successful!');
        console.log('📦 Hello response:', helloResponse.data);
        console.log('📊 Status response:', statusResponse.data);
        console.log('📡 Response headers (hello):', helloResponse.headers);
        console.log('📡 Response status (hello):', helloResponse.status);

        console.log('💾 Updating state with backend data...');
        setBackendData(helloResponse.data);
        setServerStatus(statusResponse.data);
        setError(null);
        
        console.log('🎉 Data fetch completed successfully');
      } catch (err) {
        console.error('❌ Error fetching data from backend:');
        console.error('🔍 Error details:', err);
        console.error('📍 Error message:', err.message);
        console.error('🌐 Error response:', err.response?.data);
        console.error('📊 Error status:', err.response?.status);
        console.error('📋 Error headers:', err.response?.headers);
        
        if (err.code === 'ECONNREFUSED') {
          console.error('🚫 Connection refused - backend server might be down');
        } else if (err.code === 'NETWORK_ERROR') {
          console.error('🌐 Network error - check internet connection');
        }
        
        setError('Failed to connect to backend API');
        console.log('💾 Error state updated');
      } finally {
        console.log('🏁 Setting loading state to false');
        setLoading(false);
      }
    };

    fetchData();
  }, [BACKEND_URL]);

  const refreshData = () => {
    console.log('🔄 Refresh button clicked by user');
    console.log('🧹 Clearing current state...');
    setLoading(true);
    setError(null);
    console.log('🔃 Reloading page to re-trigger data fetch...');
    // Re-trigger the effect by changing a dependency
    window.location.reload();
  };

  // Log state changes
  useEffect(() => {
    console.log('📊 State updated - Loading:', loading);
  }, [loading]);

  useEffect(() => {
    console.log('📊 State updated - Error:', error);
  }, [error]);

  useEffect(() => {
    console.log('📊 State updated - Backend Data:', backendData);
  }, [backendData]);

  useEffect(() => {
    console.log('📊 State updated - Server Status:', serverStatus);
  }, [serverStatus]);

  console.log('🎨 Rendering App component with current state:', {
    loading,
    error: !!error,
    hasBackendData: !!backendData,
    hasServerStatus: !!serverStatus
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Full-Stack React + Node.js Demo</h1>
        <p>Demonstrating React frontend connected to Node.js backend API</p>
        
        {loading && (
          <div className="loading">
            {console.log('⏳ Rendering loading state')}
            Loading...
          </div>
        )}
        
        {error && (
          <div className="error">
            {console.log('❌ Rendering error state:', error)}
            <p>❌ {error}</p>
            <button onClick={refreshData} className="retry-btn">
              Retry Connection
            </button>
          </div>
        )}

        {!loading && !error && backendData && (
          <div className="success">
            {console.log('✅ Rendering success state with data')}
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
                    {backendData.data.features.map((feature, index) => {
                      console.log(`📋 Rendering feature ${index + 1}:`, feature);
                      return <li key={index}>{feature}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {serverStatus && (
              <div className="status-section">
                {console.log('📊 Rendering server status section')}
                <h3>Server Status:</h3>
                <div className="status-card">
                  <p><strong>Status:</strong> {serverStatus.status}</p>
                  <p><strong>Uptime:</strong> {Math.floor(serverStatus.uptime)} seconds</p>
                  <p><strong>Version:</strong> {serverStatus.version}</p>
                </div>
              </div>
            )}

            <button 
              onClick={() => {
                console.log('🔄 Refresh button clicked - triggering data refresh');
                refreshData();
              }} 
              className="refresh-btn"
            >
              🔄 Refresh Data
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