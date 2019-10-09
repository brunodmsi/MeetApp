import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import Banner from '~/components/BannerInput';
import DatePicker from '~/component/DatePicker';

import { Container } from './styles';

export default function Meetup() {
  const dispatch = useDispatch();
  // const meetup = useSelector(state => state.meetups);

  function handleSubmit(data) {
    //dispatch(saveMeetupRequest(data));
  }

  return (
    <Container>
      <Form initialData={} onSubmit={handleSubmit} >
        <Banner id={meetup.id} />

        <Input name="title" placeholder="Qual o título do Meetup" />
        <Input name="description" placeholder="Descrição do Meetup" />
        <DatePicker name="date" placeholder="Quando será?" />
        <Input name="location" placeholder="Onde será?" />

        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          <span>Salvar meetup</span>
        </button>
      </Form>
    </Container>
  );
}
