import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import User from '../core/User';
import { cpfMask, phoneMask } from '../static/inputMask';

interface UsersTableProps {
  users: User[];
  exclusionHandler: (id: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, exclusionHandler }) => {
  return (
    <Table striped hover responsive variant='light'>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Endereço</th>
          <th>Observação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{cpfMask(user.cpf)}</td>
              <td>{phoneMask(user.phone)}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.note}</td>
              <td>
                <Button className='w-full me-1 d-inline-block'>
                  <Link
                    to={`/alterar/${user.id}`}
                    className='text-white text-decoration-none'
                  >
                    Alterar
                  </Link>
                </Button>
                <Button
                  variant='danger'
                  onClick={() => exclusionHandler(user.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UsersTable;
