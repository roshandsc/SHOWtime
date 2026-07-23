import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export const Layout = ({ children }) => {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="main-content" style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
