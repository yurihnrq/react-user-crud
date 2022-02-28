import React from 'react';
import { Table } from 'react-bootstrap';
import User from '../core/User';

interface UsersTableProps {
  users: User[]
}

const UsersTable: React.FC<UsersTableProps> = ({users}) => {
  return (
    <Table
      striped
      bordered
      hover
      responsive
      variant='dark'
      className='rounded-3 overflow-auto'
    >
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Endereço</th>
          <th>Observação</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.cpf}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.note}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UsersTable;
