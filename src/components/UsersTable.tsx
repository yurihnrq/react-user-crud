import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import User from '../core/User';
import { cpfMask, phoneMask } from '../static/inputMask';
import { EditIcon, TrashIcon } from './layout/Icons';

interface UsersTableProps {
  users: User[];
  exclusionHandler: (id: number) => void;
}

// Componente que simplesmente recebe um array de usuários e itera sobre eles
// imprimindo-os numa tabela.
// Também recebe uma função para realizar a exclusão dos usuários.
const UsersTable: React.FC<UsersTableProps> = ({ users, exclusionHandler }) => {
  return (
    <Table striped hover variant='light' responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Nascimento</th>
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
              <td>{user.birth}</td>
              <td>{phoneMask(user.phone)}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.note}</td>
              <td>
                <div className='d-flex'>
                  <Button className='w-full me-1 d-inline-block'>
                    <Link
                      to={`/alterar/${user.id}`}
                      className='text-white text-decoration-none'
                    >
                      <EditIcon color='#FFFFFF' height={25} width={25} />
                    </Link>
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => exclusionHandler(user.id)}
                    className='d-inline-block'
                  >
                    <TrashIcon color='#FFFFFF' height={25} width={25} />
                  </Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UsersTable;
