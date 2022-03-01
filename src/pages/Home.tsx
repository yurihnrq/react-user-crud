import React, { useEffect, useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import Layout from '../components/Layout';
import UsersTable from '../components/UsersTable';
import User from '../core/User';

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Estado da informação que é utilizada para buscar usuários na API.
  // Como guardo ele no localStorage, na hora de definir usu estado
  // inicial, verifico se não há algum valor salvo localmente.
  const [info, setInfo] = useState<string>(() => {
    const storedValue = localStorage.getItem('userInfo');
    if (storedValue) return storedValue;
    return '';
  });

  // Realiza a requisição na API para obter uma lista de usuários
  // compatíveis com a informação fornecida.
  const fetchUsers = () => {
    fetch('http://127.0.0.1:8000/api/user/info/' + info)
      .then(async response => {
        if (response.ok) {
          setError(null);
          return response.json();
        } else throw new Error('Não foi possível contatar o servidor.');
      })
      .then(data => setUsers(data))
      .catch(reason => setError(reason.message));
    // Salva a informação no localStorage.
    localStorage.setItem('userInfo', info);
  };

  // Realiza a requisição na API para excluir um usuário com o ID
  // recebido como parâmetro.
  const excludeUser = (userID: number) => {
    setError(null);
    fetch('http://127.0.0.1:8000/api/user/' + userID, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) throw new Error('Usuário não encontrado.');
        fetchUsers();
      })
      .catch(reason => {
        console.error(reason.message);
        setError(reason.message);
      });
  };
  
  // Sempre que o estado de info mudar, chama a função que
  // realiza a requisição no servidor e obtém dados de usuários.
  useEffect(() => {
    // Verifica se o comprimento da string de informação é maior que 2.
    // Fiz dessa maneira para que haja uma especificidade maior na hora
    // da pesquisa por usuários.
    if (info.length > 2) {
      fetchUsers();
    } else setUsers([]);
  }, [info]);

  return (
    <Layout>
      <Form
        style={{ maxWidth: 700 }}
        className='mx-auto'
        onSubmit={e => e.preventDefault()}
      >
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
        <UsersTable exclusionHandler={excludeUser} users={users} />
      ) : (
        <span style={{ maxWidth: 700 }} className='mx-auto d-block'>
          Insira uma informação válida no campo acima. ⬆️
        </span>
      )}
    </Layout>
  );
};

export default Home;
