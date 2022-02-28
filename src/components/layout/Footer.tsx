import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

const Footer: React.FC = () => {
  return (
    <footer
      className={`
        position-absolute bottom-0 w-100 p-3
        bg-dark text-white
      `}
    >
      <Container>
        <Row className='text-center align-items-center'>
          <Col sm>
            App desenvolvido por{' '}
            <span style={{ whiteSpace: 'nowrap' }}>
              Yuri Henrique B. Maciel
            </span>
          </Col>
          <Col sm className='d-flex justify-content-center gap-3'>
            <Link to='/'>Inicio</Link>
            <Link to='/cadastro'>Cadastro</Link>
            <Link to='/sobre'>Sobre</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
