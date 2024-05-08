import React from 'react';

const ComingSoonPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Coming Soon</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
};

export default ComingSoonPage;
