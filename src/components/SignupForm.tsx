import React, { FormEventHandler, MouseEventHandler, useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { cpfMask, phoneMask, removeMaskChars } from '../static/inputMask';
import validateSignupForm from '../static/validateSignupForm';

const SignupForm: React.FC = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [cpf, setCPF] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const resetHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setError(null);
    setSuccess(false);
    setName('');
    setCPF('');
    setPhone('');
    setEmail('');
    setAddress('');
    setNote('');
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setFetching(true);

    const form = document.querySelector('form');

    if (form) {
      const formData = new FormData(form);

      if (validateSignupForm(formData)) {
        const cpfString = removeMaskChars(cpf);
        const phoneString = removeMaskChars(phone);

        formData.append('cpf', cpfString);
        formData.append('phone', phoneString);
        fetch('http://127.0.0.1:8000/api/user/', {
          method: 'POST',
          body: formData
        })
          .then(response =>
            response.json().then(data => ({
              ok: response.ok,
              body: data
            }))
          )
          .then(resObj => {
            if (!resObj.ok) throw new Error(resObj.body.message);
            setSuccess(true);
            setError(null);
          })
          .catch(reason => {
            setError('Erro ao realizar cadastro: ' + reason.message);
            setSuccess(false);
          });
      } else setError('Preencha os campos corretamente');
    }
    setFetching(false);
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className='mb-2'>
        <Form.Label>Nome:</Form.Label>
        <Form.Control
          value={name}
          onChange={({ target }) => setName(target.value)}
          name='name'
          type='text'
          placeholder='Ex: Yuri Henrique'
        />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>CPF:</Form.Label>
        <Form.Control
          value={cpf}
          onChange={({ target }) => setCPF(cpfMask(target.value))}
          name='cpf'
          type='text'
          placeholder='Ex: 111.333.444-55'
        />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>Telefone:</Form.Label>
        <Form.Control
          value={phone}
          onChange={({ target }) => setPhone(phoneMask(target.value))}
          name='phone'
          type='text'
          placeholder='(34) 9 9999-9999'
        />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          name='email'
          type='email'
          placeholder='Ex: user@mail.com'
        />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>Endereço:</Form.Label>
        <Form.Control
          value={address}
          onChange={({ target }) => setAddress(target.value)}
          type='text'
          name='address'
          placeholder='Ex: R. Limoeiro, 566 - São Paulo, SP'
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Obervação:</Form.Label>
        <Form.Control
          as='textarea'
          value={note}
          onChange={({ target }) => setNote(target.value)}
          name='note'
          type='text'
          placeholder='Uma observação qualquer...'
          maxLength={300}
          style={{ resize: 'none' }}
          rows={5}
        />
      </Form.Group>
      {error !== null ? <Alert variant='danger'>{error}</Alert> : null}
      {success ? (
        <Alert variant='success'>Usuário cadastrado com sucesso.</Alert>
      ) : null}
      <Container fluid className='d-flex flex-column p-0'>
        <Button
          disabled={fetching}
          type='submit'
          variant='success'
          className='mb-2'
        >
          Cadastrar
        </Button>
        <Button disabled={fetching} onClick={resetHandler} variant='danger'>
          Limpar
        </Button>
      </Container>
    </Form>
  );
};

export default SignupForm;
