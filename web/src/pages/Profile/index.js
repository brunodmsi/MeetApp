import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import { updateProfileRequest } from '~/store/modules/user/actions'

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

        <hr/>

        <Input name="oldPassword"
              type="password"
              placeholder="Senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input name="confirmPassword"
          type="password"
          placeholder="Confirmar senha"
        />

        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          <span>Salvar perfil</span>
        </button>
      </Form>
    </Container>
  );
}
