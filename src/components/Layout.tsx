import React from 'react';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { Container } from 'react-bootstrap';

const Layout: React.FC = ({ children }) => {
  return (
    <Container fluid className='p-0 min-vh-100 bg-secondary text-white'>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </Container>
  );
};

export default Layout;
