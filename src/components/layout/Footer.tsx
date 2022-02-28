import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer
      className={`
        position-absolute bottom-0 w-100 p-3
        bg-secondary text-white
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
            <Link className='text-white' to='/'>
              Inicio
            </Link>
            <Link className='text-white' to='/cadastro'>
              Cadastro
            </Link>
            <Link className='text-white' to='/sobre'>
              Sobre
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
