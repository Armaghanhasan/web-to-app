import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [appName, setAppName] = useState('');
  const [app, setApp] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const finalUrl = url.startsWith('http') ? url : `https://${url}`;
      const res = await fetch('/api/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl, name: appName }),
      });

      if (!res.ok) throw new Error('Failed to generate app');
      const data = await res.json();
      setApp(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '40px', 
      maxWidth: '500px', 
      margin: '50px auto', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '10px', 
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
    }}>
      <h1 style={{ color: '#5a189a', textAlign: 'center' }}>🌐 Web → App AI</h1>
      <p style={{ color: '#555', fontSize: '14px', textAlign: 'center' }}>
        Turn any website into a mobile app instantly.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter website URL (e.g., example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        />
        <input
          type="text"
          placeholder="App Name"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#5a189a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          🚀 Generate App
        </button>
      </form>

      {error && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '5px',
        }}>
          {error}
        </div>
      )}

      {app && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          borderRadius: '5px',
        }}>
          <h3>✅ App Ready!</h3>
          <p><strong>Name:</strong> {app.name}</p>
          <p><strong>Status:</strong> {app.status}</p>
          {app.apkUrl && (
            <a href={app.apkUrl} download style={{
              display: 'block',
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              textAlign: 'center',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}>
              📥 Download Android APK
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default App;