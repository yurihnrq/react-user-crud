import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='md'>
        <Container>
          <Navbar.Brand
            as={Link}
            to='/'
            className='d-flex align-items-center gap-1'
          >
            <UserIcon color='#FFFFFF' height={40} width={40} /> User CRUD
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link className='text-white' as={Link} to='/'>
                Inicio
              </Nav.Link>
              <Nav.Link className='text-white' as={Link} to='/cadastro'>
                Cadastro
              </Nav.Link>
              <Nav.Link className='text-white' as={Link} to='/sobre'>
                Sobre
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
