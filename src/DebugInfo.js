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
          background: 'rgba(26, 32, 44, 0.95)',
          color: '#e2e8f0',
          border: '1px solid rgba(74, 85, 104, 0.3)',
          padding: '12px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '600',
          zIndex: 1000,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease',
          letterSpacing: '0.025em'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        }}
      >
        Debug Console
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(26, 32, 44, 0.98)',
      color: '#e2e8f0',
      padding: '20px',
      borderRadius: '12px',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
      fontSize: '11px',
      maxWidth: '450px',
      maxHeight: '500px',
      overflow: 'auto',
      zIndex: 1000,
      border: '1px solid rgba(74, 85, 104, 0.3)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid rgba(74, 85, 104, 0.3)'
      }}>
        <strong style={{ 
          color: '#63b3ed',
          fontSize: '13px',
          fontWeight: '700',
          letterSpacing: '0.05em'
        }}>
          Debug Console
        </strong>
        <button 
          onClick={() => setShowDebug(false)}
          style={{
            background: 'rgba(252, 129, 129, 0.2)',
            color: '#fc8181',
            border: '1px solid rgba(252, 129, 129, 0.3)',
            padding: '6px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '10px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(252, 129, 129, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(252, 129, 129, 0.2)';
          }}
        >
          Close
        </button>
      </div>
      
      <pre style={{ 
        margin: 0, 
        whiteSpace: 'pre-wrap', 
        wordBreak: 'break-word',
        lineHeight: '1.5',
        color: '#cbd5e0',
        fontSize: '10px'
      }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      
      <div style={{ 
        marginTop: '16px', 
        paddingTop: '12px', 
        borderTop: '1px solid rgba(74, 85, 104, 0.3)',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <div style={{ 
          color: '#90cdf4', 
          marginBottom: '8px',
          fontSize: '11px',
          fontWeight: '600',
          width: '100%'
        }}>
          Console Actions:
        </div>
        <button 
          onClick={() => {
            console.log('Manual debug log triggered');
            console.log('Current debug info:', debugInfo);
          }}
          style={{
            background: 'rgba(66, 153, 225, 0.2)',
            color: '#63b3ed',
            border: '1px solid rgba(66, 153, 225, 0.3)',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '10px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(66, 153, 225, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(66, 153, 225, 0.2)';
          }}
        >
          Log Debug Info
        </button>
        <button 
          onClick={() => {
            console.clear();
            console.log('Console cleared manually');
          }}
          style={{
            background: 'rgba(237, 137, 54, 0.2)',
            color: '#ed8936',
            border: '1px solid rgba(237, 137, 54, 0.3)',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '10px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(237, 137, 54, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(237, 137, 54, 0.2)';
          }}
        >
          Clear Console
        </button>
      </div>
    </div>
  );
};

export default DebugInfo; 