import React, { useEffect, useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import Layout from '../components/Layout';
import UsersTable from '../components/UsersTable';
import User from '../core/User';

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string>(() => {
    const storedValue = localStorage.getItem('userInfo');
    if (storedValue) return storedValue;
    return '';
  });

  useEffect(() => {
    if (info.length > 2) {
      fetch('http://127.0.0.1:8000/api/user/info/' + info)
        .then(async response => {
          if (response.ok) {
            setError(null);
            return response.json();
          } else throw new Error('Não foi possível contatar o servidor.');
        })
        .then(data => setUsers(data))
        .catch(reason => setError(reason.message));
      localStorage.setItem('userInfo', info);
    }
  }, [info]);

  return (
    <Layout>
      <Form style={{ maxWidth: 700 }} className='mx-auto'>
        <Form.Group className='mb-3'>
          <Form.Label>Pesquise por um usuário</Form.Label>
          <Form.Control
            value={info}
            onChange={({ target }) => setInfo(target.value)}
            type='text'
            placeholder='Digite um nome ou email...'
          />
        </Form.Group>
      </Form>
      {error !== null ? <Alert variant='danger'>{error}</Alert> : null}
      {users.length > 0 ? (
        <UsersTable users={users} />
      ) : (
        <span style={{ maxWidth: 700 }} className='mx-auto d-block'>
          Insira uma informação válida no campo acima. ⬆️
        </span>
      )}
    </Layout>
  );
};

export default Home;
