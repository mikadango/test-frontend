import React, { useState } from 'react';

const DebugInfo = ({ backendUrl, loading, error, backendData, serverStatus }) => {
  const [showDebug, setShowDebug] = useState(false);

  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    backendUrl: backendUrl,
    state: {
      loading,
      hasError: !!error,
      hasBackendData: !!backendData,
      hasServerStatus: !!serverStatus
    },
    environmentVariables: {
      NODE_ENV: process.env.NODE_ENV,
      REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL
    },
    browserInfo: {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      onLine: navigator.onLine
    }
  };

  if (!showDebug) {
    return (
      <button 
        onClick={() => setShowDebug(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#2c3e50',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '12px',
          zIndex: 1000
        }}
      >
        🐛 Debug Info
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: '#00ff00',
      padding: '15px',
      borderRadius: '10px',
      fontFamily: 'monospace',
      fontSize: '11px',
      maxWidth: '400px',
      maxHeight: '500px',
      overflow: 'auto',
      zIndex: 1000,
      border: '1px solid #333'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <strong style={{ color: '#ffff00' }}>🐛 Debug Information</strong>
        <button 
          onClick={() => setShowDebug(false)}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '5px 8px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
        >
          ✕
        </button>
      </div>
      
      <pre style={{ 
        margin: 0, 
        whiteSpace: 'pre-wrap', 
        wordBreak: 'break-word',
        lineHeight: '1.4'
      }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      
      <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #333' }}>
        <div style={{ color: '#ffff00', marginBottom: '5px' }}>Console Actions:</div>
        <button 
          onClick={() => {
            console.log('🐛 Manual debug log triggered');
            console.log('Current debug info:', debugInfo);
          }}
          style={{
            background: '#3498db',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '10px',
            marginRight: '5px'
          }}
        >
          Log Debug Info
        </button>
        <button 
          onClick={() => {
            console.clear();
            console.log('🧹 Console cleared manually');
          }}
          style={{
            background: '#f39c12',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
        >
          Clear Console
        </button>
      </div>
    </div>
  );
};

export default DebugInfo; 