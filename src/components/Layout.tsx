import React from 'react';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { Container } from 'react-bootstrap';

interface LayoutProps {
  width?: number | string;
}

const Layout: React.FC<LayoutProps> = ({ children, width }) => {
  return (
    <Container
      fluid
      className='p-0 min-vh-100 bg-white position-relative'
    >
      <Header />
      <Container
        style={{ maxWidth: width, paddingBottom: 150 }}
        className='pt-4'
      >
        {children}
      </Container>
      <Footer />
    </Container>
  );
};

Layout.defaultProps = {
  width: 'auto'
};

export default Layout;
