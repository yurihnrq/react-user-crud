import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import User from '../core/User';
import UpdateForm from '../components/UpdateForm';
import { Alert } from 'react-bootstrap';

const Update: React.FC = () => {
  // useParams() retorna um objeto contendo os parâmetros
  // recebidos pela URL.
  const { id } = useParams();
  const [error, setError] = useState<boolean | null>(false);
  const [user, setUser] = useState<User>();

  // Função responsável por fazer a requisição na API e
  // obter um usuário utilizando um ID.
  const fetchUser = (userID: string) => {
    fetch('http://127.0.0.1:8000/api/user/' + userID)
      .then(async response => {
        if (response.ok) {
          setError(null);
          return response.json();
        }
        if (response.status === 404) throw new Error('Usuário não encontrado.');
        if (response.status === 400)
          throw new Error('Falha no servidor, tente novamente mais tarde.');
      })
      .then(data => {
        setUser(data[0]);
        console.log(data[0]);
      })
      .catch(reason => setError(reason.message));
  };

  useEffect(() => {
    // Assim que a página é carregada, se houver um ID válido,
    // chama a função fetchUser().
    if (id) fetchUser(id);
  }, []);

  if (user)
    return (
      <Layout width={600}>
        <span>Alterar usuário de ID: {user.id}</span>
        <UpdateForm user={user} />
      </Layout>
    );
  else
    return (
      <Layout width={600}>
        <Alert variant='danger'>{error}</Alert>
      </Layout>
    );
};

export default Update;
