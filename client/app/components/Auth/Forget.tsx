import React, { useState } from 'react';

const ForgetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (email.trim() === '') {
      setMessage('Please enter your email address.');
    } else {
      // Placeholder message for demonstration
      setMessage('Password reset instructions have been sent to your email.');
      setEmail('');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Forget Password</h2>
      <div style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="button" onClick={handleSubmit} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Submit</button>
      </div>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default ForgetPasswordPage;
