import React, { FormEventHandler, useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import User from '../core/User';
import {
  cpfMask,
  phoneMask,
  nameMask,
  removeMaskChars
} from '../static/inputMask';
import { validateUserForm } from '../static/formValidate';

interface UpdateFormProps {
  user: User;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ user }) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [name, setName] = useState<string>(user.name);
  const [cpf, setCPF] = useState<string>(cpfMask(user.cpf));
  const [birth, setBirth] = useState<string>(user.birth);
  const [phone, setPhone] = useState<string>(phoneMask(user.phone));
  const [email, setEmail] = useState<string>(user.email);
  const [address, setAddress] = useState<string>(user.address);
  const [note, setNote] = useState<string>(user.note);

  const resetHandler = () => {
    setError(null);
    setName('');
    setCPF('');
    setBirth('');
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
      // Obtenho os dados do formulário no formato FormData.
      const formData = new FormData(form);

      // Verifico se os dados estão corretos.
      // Caso positivo, prossigo com a requisição.
      if (validateUserForm(formData)) {
        const cpfString = removeMaskChars(cpf);
        const phoneString = removeMaskChars(phone);

        formData.append('cpf', cpfString);
        formData.append('phone', phoneString);
        // Por questões de segurança, o PHP não permite FormData no método PUT.
        // Entretanto, uma maneira de sanar esse problema, é fazendo uma
        // requisição POST e passar um parâmetro chamado _method de valor PUT.
        // Dese modo, o servidor interpretará a requisição como PUT e permitirá
        // o uso de FormData.
        formData.append('_method', 'PUT');
        fetch('http://127.0.0.1:8000/api/user/' + user.id, {
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
            resetHandler();
            setError(null);
          })
          .catch(reason => {
            setError('Erro ao realizar alteração: ' + reason.message);
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
          onChange={({ target }) => setName(nameMask(target.value))}
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
        <Form.Label>Data de nascimento:</Form.Label>
        <Form.Control
          onChange={({ target }) => setBirth(target.value)}
          value={birth}
          name='birth'
          type='date'
          placeholder='dd-mm-yyyy'
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
        <Alert variant='success'>Usuário atualizado com sucesso.</Alert>
      ) : null}
      <Container fluid className='d-flex flex-column p-0'>
        <Button
          disabled={fetching}
          type='submit'
          variant='success'
          className='mb-2'
        >
          Atualizar
        </Button>
        <Button
          disabled={fetching}
          onClick={() => resetHandler()}
          variant='danger'
        >
          Limpar
        </Button>
      </Container>
    </Form>
  );
};

export default UpdateForm;
