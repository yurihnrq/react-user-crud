import React, { FormEventHandler } from 'react';
import { Form, Button } from 'react-bootstrap';

const SignupForm: React.FC = () => {
  const submitHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className='mb-2'>
        <Form.Label>Nome:</Form.Label>
        <Form.Control type='text' placeholder='Ex: Yuri Henrique' />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>CPF:</Form.Label>
        <Form.Control type='text' placeholder='Ex: 111.333.444-55' />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>Telefone:</Form.Label>
        <Form.Control type='text' placeholder='(34) 9 9999-9999' />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>Email:</Form.Label>
        <Form.Control type='text' placeholder='Ex: user@mail.com' />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>Endereço:</Form.Label>
        <Form.Control
          type='text'
          placeholder='Ex: R. Limoeiro, 566 - São Paulo, SP'
        />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>Obervação:</Form.Label>
        <Form.Control type='text' placeholder='Uma observação qualquer...' />
      </Form.Group>
      <Button variant='dark'>Cadastrar</Button>
    </Form>
  );
};

export default SignupForm;
