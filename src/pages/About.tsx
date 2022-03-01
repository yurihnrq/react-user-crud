import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
  return (
    <Layout width={850}>
      <section>
        <h3>Sobre este projeto</h3>
        <p>
          Este projeto foi criado para a participação do processo seletivo de
          estagiário da empresa NewM.
        </p>
        <p>
          Desenvolvi este site utilizando ReactJS e o projeto foi criado com{' '}
          <a href='https://vitejs.dev/' target='_blank' rel='noreferrer'>
            Vite
          </a>
          , uma ferramenta para construção de sites que utilizam está
          biblioteca.
        </p>
        <p>
          Este site consome a API feita com Laravel, que por sua vez também foi
          construída como parte do processo. O repositório com o código da API pode ser acessada por{' '}
          <a
            href='https://github.com/yurihnrq/laravel-crud-api'
            target='_blank'
            rel='noreferrer'
          >
            este link
          </a>
          .
        </p>
      </section>
    </Layout>
  );
};

export default About;
